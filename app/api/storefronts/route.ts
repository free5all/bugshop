import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { storefronts, userStorefronts } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description } = body;

        if (!name || name.trim().length === 0) {
            return NextResponse.json({ error: "Storefront name is required" }, { status: 400 });
        }

        // Create the storefront
        const [newStorefront] = await db.insert(storefronts).values({
            name: name.trim(),
            description: description?.trim() || null,
            ownerId: session.user.id,
        }).returning();

        // Add the user as owner in the user_storefronts table
        await db.insert(userStorefronts).values({
            userId: session.user.id,
            storefrontId: newStorefront.id,
            role: "owner",
        });

        return NextResponse.json({ storefront: newStorefront }, { status: 201 });
    } catch (error) {
        console.error("Error creating storefront:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user's storefronts
        const userStorefrontsList = await db
            .select({
                storefront: storefronts,
                role: userStorefronts.role,
            })
            .from(userStorefronts)
            .innerJoin(storefronts, eq(userStorefronts.storefrontId, storefronts.id))
            .where(eq(userStorefronts.userId, session.user.id));

        return NextResponse.json({ storefronts: userStorefrontsList });
    } catch (error) {
        console.error("Error fetching storefronts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}