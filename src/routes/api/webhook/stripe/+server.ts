import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request }) => {
    const sig = request.headers.get('stripe-signature');
    const body = await request.text();

    let event: Stripe.Event;

    try {
        if (!sig || !STRIPE_WEBHOOK_SECRET) {
            console.error('Missing Stripe signature or webhook secret');
            return new Response('Bad Request', { status: 400 });
        }
        event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return new Response('Webhook Error', { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            // TODO: Handle successful checkout
            console.log('Checkout session completed:', event.data.object);
            break;
        // Add more event types as needed
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response('ok', { status: 200 });
};