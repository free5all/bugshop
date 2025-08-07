import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { cartItems, products, storefronts, orders, orderItems } from "@/lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia"
});

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { storefrontId } = body;

        if (!storefrontId) {
            return NextResponse.json({ error: "Storefront ID is required" }, { status: 400 });
        }

        // Get cart items for this storefront
        const userCartItems = await db
            .select({
                cartItem: cartItems,
                product: products,
                storefront: storefronts,
            })
            .from(cartItems)
            .innerJoin(products, eq(cartItems.productId, products.id))
            .innerJoin(storefronts, eq(cartItems.storefrontId, storefronts.id))
            .where(
                and(
                    eq(cartItems.userId, session.user.id),
                    eq(cartItems.storefrontId, storefrontId)
                )
            );

        if (userCartItems.length === 0) {
            return NextResponse.json({ error: "No items in cart for this storefront" }, { status: 400 });
        }

        // Calculate total
        const totalAmount = userCartItems.reduce((total, item) => {
            return total + (parseFloat(item.product.price) * item.cartItem.quantity);
        }, 0);

        // Create order in database
        const [newOrder] = await db.insert(orders).values({
            userId: session.user.id,
            storefrontId,
            totalAmount: totalAmount.toString(),
            status: "pending",
        }).returning();

        // Create order items
        for (const item of userCartItems) {
            await db.insert(orderItems).values({
                orderId: newOrder.id,
                productId: item.product.id,
                quantity: item.cartItem.quantity,
                price: item.product.price,
            });
        }

        // Create Stripe checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: userCartItems.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.name,
                        description: `From ${item.storefront.name}`,
                    },
                    unit_amount: Math.round(parseFloat(item.product.price) * 100), // Convert to cents
                },
                quantity: item.cartItem.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            metadata: {
                orderId: newOrder.id,
                userId: session.user.id,
                storefrontId,
            },
        });

        // Update order with Stripe session ID
        await db
            .update(orders)
            .set({ stripePaymentIntentId: checkoutSession.id })
            .where(eq(orders.id, newOrder.id));

        return NextResponse.json({ sessionUrl: checkoutSession.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}