import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { products, userStorefronts } from "@/lib/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, quantity, storefrontId } = body;

        if (!name || !price || !storefrontId) {
            return NextResponse.json({ error: "Name, price, and storefront ID are required" }, { status: 400 });
        }

        // Check if user has permission to add products to this storefront
        const [userStorefront] = await db
            .select()
            .from(userStorefronts)
            .where(
                and(
                    eq(userStorefronts.userId, session.user.id),
                    eq(userStorefronts.storefrontId, storefrontId),
                    // Only owners and managers can add products
                    // Note: In a real app, you'd have an OR condition here
                )
            )
            .limit(1);

        if (!userStorefront || (userStorefront.role !== 'owner' && userStorefront.role !== 'manager')) {
            return NextResponse.json({ error: "Not authorized to add products to this storefront" }, { status: 403 });
        }

        // Create the product
        const [newProduct] = await db.insert(products).values({
            name: name.trim(),
            description: description?.trim() || null,
            price: price.toString(),
            quantity: quantity || 1,
            storefrontId,
        }).returning();

        return NextResponse.json({ product: newProduct }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const storefrontId = searchParams.get('storefrontId');

        if (!storefrontId) {
            return NextResponse.json({ error: "Storefront ID is required" }, { status: 400 });
        }

        // Get products for this storefront
        const storefrontProducts = await db
            .select()
            .from(products)
            .where(eq(products.storefrontId, storefrontId));

        return NextResponse.json({ products: storefrontProducts });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}