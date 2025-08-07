import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { cartItems, products, storefronts } from "@/lib/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user's cart items
        const userCartItems = await db
            .select({
                cartItem: cartItems,
                product: products,
                storefront: storefronts,
            })
            .from(cartItems)
            .innerJoin(products, eq(cartItems.productId, products.id))
            .innerJoin(storefronts, eq(cartItems.storefrontId, storefronts.id))
            .where(eq(cartItems.userId, session.user.id));

        return NextResponse.json({ cartItems: userCartItems });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { productId, quantity = 1 } = body;

        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        // Get product details to verify it exists and get storefront
        const [product] = await db
            .select()
            .from(products)
            .where(eq(products.id, productId))
            .limit(1);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Check if item is already in cart
        const [existingCartItem] = await db
            .select()
            .from(cartItems)
            .where(
                and(
                    eq(cartItems.userId, session.user.id),
                    eq(cartItems.productId, productId)
                )
            )
            .limit(1);

        if (existingCartItem) {
            // Update quantity
            const [updatedCartItem] = await db
                .update(cartItems)
                .set({ quantity: existingCartItem.quantity + quantity })
                .where(eq(cartItems.id, existingCartItem.id))
                .returning();

            return NextResponse.json({ cartItem: updatedCartItem });
        } else {
            // Add new cart item
            const [newCartItem] = await db
                .insert(cartItems)
                .values({
                    userId: session.user.id,
                    productId,
                    storefrontId: product.storefrontId,
                    quantity,
                })
                .returning();

            return NextResponse.json({ cartItem: newCartItem }, { status: 201 });
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const cartItemId = searchParams.get('id');

        if (!cartItemId) {
            return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 });
        }

        // Delete cart item (only if it belongs to the user)
        await db
            .delete(cartItems)
            .where(
                and(
                    eq(cartItems.id, cartItemId),
                    eq(cartItems.userId, session.user.id)
                )
            );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}