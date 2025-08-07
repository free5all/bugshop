"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
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

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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

    const removeFromCart = async (cartItemId: string) => {
        try {
            const response = await fetch(`/api/cart?id=${cartItemId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setCartItems(items => items.filter(item => item.cartItem.id !== cartItemId));
            }
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.product.price) * item.cartItem.quantity);
        }, 0).toFixed(2);
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-green-50">
                <Header>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <SignInButton />
                        <UserButton user={null} />
                    </div>
                </Header>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">Loading cart...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50">
            <Header>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <SignInButton />
                    <UserButton user={null} />
                </div>
            </Header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Link>

                <div className="flex items-center mb-8">
                    <ShoppingCart className="h-8 w-8 text-green-600 mr-4" />
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Shopping Cart</h1>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-12 text-center">
                        <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 text-lg">Add some items to get started!</p>
                        <Link
                            href="/"
                            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {Object.entries(getStorefrontGroups()).map(([storefrontId, items]) => (
                                <div key={storefrontId} className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        From {items[0].storefront.name}
                                    </h3>
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.cartItem.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                                                <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
                                                    {/* Placeholder for product image */}
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                                                    <p className="text-green-600 font-semibold">${item.product.price}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-600">Qty: {item.cartItem.quantity}</span>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.cartItem.id)}
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>${getTotalPrice()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>
                                <div className="border-t pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${getTotalPrice()}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => router.push("/checkout")}
                                    className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                                >
                                    Proceed to Checkout
                                </button>
                                <div className="mt-4 text-sm text-gray-500 text-center">
                                    Note: Each storefront checkout separately for now
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}