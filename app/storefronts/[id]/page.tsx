import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { storefronts, products, userStorefronts } from "@/lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { Store, ShoppingCart, ArrowLeft, Package, Settings } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/lib/components/AddToCartButton";

interface StorefrontPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function StorefrontPage({ params }: StorefrontPageProps) {
    const session = await auth();
    const { id } = await params;
    
    // Get storefront details
    const [storefront] = await db
        .select()
        .from(storefronts)
        .where(eq(storefronts.id, id))
        .limit(1);

    if (!storefront) {
        return (
            <div className="min-h-screen bg-green-50">
                <Header>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {!session && <SignInButton />}
                        {session && session.user && (
                            <UserButton user={session.user} />
                        )}
                    </div>
                </Header>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Storefront Not Found</h1>
                        <Link href="/" className="text-green-600 hover:text-green-800">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Get products for this storefront
    const storefrontProducts = await db
        .select()
        .from(products)
        .where(eq(products.storefrontId, id));

    // Check if current user can manage this storefront
    let canManage = false;
    if (session?.user?.id) {
        const [userStorefront] = await db
            .select()
            .from(userStorefronts)
            .where(
                and(
                    eq(userStorefronts.userId, session.user.id),
                    eq(userStorefronts.storefrontId, id)
                )
            )
            .limit(1);
        
        canManage = !!userStorefront && (userStorefront.role === 'owner' || userStorefront.role === 'manager');
    }

    return (
        <div className="min-h-screen bg-green-50">
            <Header>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {!session && <SignInButton />}
                    <Link href="/cart" className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 text-primary-foreground hidden sm:flex hover:bg-green-700 bg-green-600 cursor-pointer">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span className="hidden lg:inline">Cart</span>
                    </Link>
                    {session && session.user && (
                        <UserButton user={session.user} />
                    )}
                </div>
            </Header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                {/* Storefront Header */}
                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="bg-green-100 rounded-full p-4">
                            <Store className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{storefront.name}</h1>
                            {storefront.description && (
                                <p className="text-gray-600 mb-4">{storefront.description}</p>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Member since {new Date(storefront.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        {canManage && (
                            <Link
                                href={`/storefronts/${id}/manage`}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                Manage Storefront
                            </Link>
                        )}
                    </div>
                </div>

                {/* Products Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
                    
                    {storefrontProducts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-8 text-center">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products yet</h3>
                            <p className="text-gray-500">This storefront hasn&apos;t listed any products yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {storefrontProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gray-200"></div> {/* Placeholder for product image */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                        {product.description && (
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-green-600">${product.price}</span>
                                            <AddToCartButton 
                                                productId={product.id}
                                                productName={product.name}
                                                disabled={product.quantity === 0}
                                            />
                                        </div>
                                        {product.quantity <= 5 && (
                                            <p className="text-xs text-orange-600 mt-2">
                                                Only {product.quantity} left in stock
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}