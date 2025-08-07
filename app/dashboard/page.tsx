import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { storefronts, userStorefronts } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { Store, Plus, ShoppingCart, ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
    
    if (!session || !session.user?.id) {
        redirect("/sign-in");
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

    return (
        <div className="min-h-screen bg-green-50">
            <Header>
                <div className="flex items-center space-x-2 sm:space-x-4">
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

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
                        <p className="text-gray-600">Manage your storefronts and view orders</p>
                    </div>
                    <Link
                        href="/storefronts/create"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Storefront
                    </Link>
                </div>

                {/* Storefronts Section */}
                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Storefronts</h2>
                    
                    {userStorefrontsList.length === 0 ? (
                        <div className="text-center py-8">
                            <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">No storefronts yet</h3>
                            <p className="text-gray-500 mb-4">Create your first storefront to start selling</p>
                            <Link
                                href="/storefronts/create"
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Storefront
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userStorefrontsList.map(({ storefront, role }) => (
                                <div key={storefront.id} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-green-100 rounded-full p-3">
                                            <Store className="h-6 w-6 text-green-600" />
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            role === 'owner' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {role}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{storefront.name}</h3>
                                    {storefront.description && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{storefront.description}</p>
                                    )}
                                    
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={`/storefronts/${storefront.id}`}
                                            className="flex-1 text-center px-3 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors text-sm"
                                        >
                                            View Store
                                        </Link>
                                        {(role === 'owner' || role === 'manager') && (
                                            <Link
                                                href={`/storefronts/${storefront.id}/manage`}
                                                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                                            >
                                                <Settings className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity placeholder */}
                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="text-center py-8">
                        <p className="text-gray-500">Recent orders and activity will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}