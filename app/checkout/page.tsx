"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { CreditCard, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartItem {
    cartItem: {
        id: string;
        quantity: number;
    };
    product: {
        id: string;
        name: string;
        price: string;
        images?: string;
    };
    storefront: {
        id: string;
        name: string;
    };
}

export default function CheckoutPage() {
    const { data: session, status } = useSession();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch("/api/cart");
            if (response.ok) {
                const data = await response.json();
                setCartItems(data.cartItems);
            } else {
                setError("Failed to load cart");
            }
        } catch {
            setError("Network error");
        } finally {
            setIsLoading(false);
        }
    };

    const getStorefrontGroups = () => {
        const groups: { [key: string]: CartItem[] } = {};
        cartItems.forEach(item => {
            if (!groups[item.storefront.id]) {
                groups[item.storefront.id] = [];
            }
            groups[item.storefront.id].push(item);
        });
        return groups;
    };

    const getStorefrontTotal = (items: CartItem[]) => {
        return items.reduce((total, item) => {
            return total + (parseFloat(item.product.price) * item.cartItem.quantity);
        }, 0).toFixed(2);
    };

    const handleCheckout = async (storefrontId: string) => {
        setIsProcessing(true);
        setError("");

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ storefrontId }),
            });

            if (response.ok) {
                const { sessionUrl } = await response.json();
                window.location.href = sessionUrl;
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to create checkout session");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading || status === "loading") {
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
                    <div className="text-center">Loading checkout...</div>
                </div>
            </div>
        );
    }

    const storefrontGroups = getStorefrontGroups();

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/cart"
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                </Link>

                <div className="flex items-center mb-8">
                    <CreditCard className="h-8 w-8 text-green-600 mr-4" />
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Checkout</h1>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {Object.keys(storefrontGroups).length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-green-100 p-8 text-center">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">No items to checkout</h2>
                        <p className="text-gray-500 mb-6">Your cart is empty!</p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <h3 className="text-sm font-medium text-blue-800 mb-2">Checkout Process</h3>
                            <p className="text-sm text-blue-700">
                                Currently, each storefront requires a separate checkout. You&apos;ll need to complete checkout for each seller individually.
                            </p>
                        </div>

                        {Object.entries(storefrontGroups).map(([storefrontId, items]) => (
                            <div key={storefrontId} className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order from {items[0].storefront.name}
                                </h3>
                                
                                <div className="space-y-3 mb-6">
                                    {items.map((item) => (
                                        <div key={item.cartItem.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                                                    <p className="text-sm text-gray-600">Qty: {item.cartItem.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">${(parseFloat(item.product.price) * item.cartItem.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div>
                                        <p className="text-lg font-semibold">Total: ${getStorefrontTotal(items)}</p>
                                        <p className="text-sm text-gray-600">Shipping calculated during checkout</p>
                                    </div>
                                    <button
                                        onClick={() => handleCheckout(storefrontId)}
                                        disabled={isProcessing}
                                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center"
                                    >
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        {isProcessing ? "Processing..." : "Pay Now"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}