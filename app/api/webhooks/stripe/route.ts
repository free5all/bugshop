import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { orders, cartItems, products } from "@/lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil"
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const sig = request.headers.get('stripe-signature')!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;
                
                if (session.metadata?.orderId && session.metadata?.userId) {
                    // Update order status to paid
                    await db
                        .update(orders)
                        .set({ 
                            status: "paid",
                            updatedAt: new Date()
                        })
                        .where(eq(orders.id, session.metadata.orderId));

                    // Remove items from cart for this storefront
                    if (session.metadata.storefrontId) {
                        await db
                            .delete(cartItems)
                            .where(
                                and(
                                    eq(cartItems.userId, session.metadata.userId),
                                    eq(cartItems.storefrontId, session.metadata.storefrontId)
                                )
                            );
                    }

                    // Decrement stock for each product in the order
                    const orderItems = session.metadata.orderItems ? JSON.parse(session.metadata.orderItems) : [];
                    for (const item of orderItems) {
                        const currentQty = await db
                            .select()
                            .from(products)
                            .where(eq(products.id, item.productId))
                            .then(res => res[0]?.quantity || 0);

                        if (currentQty >= item.quantity) {
                            await db
                                .update(products)
                                .set({ quantity: currentQty - item.quantity, updatedAt: new Date() })
                                .where(eq(products.id, item.productId));
                        } else {
                            console.warn(`Insufficient stock for product ${item.productId}. Current: ${currentQty}, Requested: ${item.quantity}`);
                        }
                    }

                    console.log('Order updated successfully:', session.metadata.orderId);
                }
                break;

            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object as Stripe.PaymentIntent;
                console.log('Payment failed:', failedPayment.id);
                // Handle failed payment (optional: update order status to failed)
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}