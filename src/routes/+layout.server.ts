import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    // Ensure the user is authenticated
    if (!event.locals.user || !event.locals.session) {
        return { user: null, session: null, shops: null, cart: null, cartItems: null };
    }

    console.log(event.locals.cartItems, event.locals.cart);

    // Return the user and session data
    return {
        user: event.locals.user,
        session: event.locals.session,
        shops: event.locals.shops,
        cart: event.locals.cart,
        cartItems: event.locals.cartItems
    };
};