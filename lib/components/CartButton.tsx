"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCartCount();
    }, []);

    const fetchCartCount = async () => {
        try {
            const response = await fetch("/api/cart");
            if (response.ok) {
                const { cartItems } = await response.json();
                const totalCount = cartItems.reduce((total: number, item: any) => 
                    total + item.cartItem.quantity, 0
                );
                setCartCount(totalCount);
            }
        } catch (err) {
            console.error("Error fetching cart count:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Link href="/cart" className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 text-primary-foreground hidden sm:flex hover:bg-green-700 bg-green-600 cursor-pointer relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden lg:inline">
                Cart {!isLoading && cartCount > 0 && `(${cartCount})`}
            </span>
            {!isLoading && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center lg:hidden">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </Link>
    );
}