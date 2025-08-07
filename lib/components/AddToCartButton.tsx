"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
    productId: string;
    productName: string;
    disabled?: boolean;
}

export default function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);
        
        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId, quantity: 1 }),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            } else {
                const errorData = await response.json();
                if (response.status === 401) {
                    // Redirect to sign in if not authenticated
                    window.location.href = "/sign-in";
                } else {
                    console.error("Failed to add to cart:", errorData.error);
                }
            }
        } catch (err) {
            console.error("Network error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-md transition-colors">
                Added!
            </button>
        );
    }

    return (
        <button 
            onClick={handleAddToCart}
            disabled={isLoading || disabled}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
            {isLoading ? (
                "Adding..."
            ) : (
                <>
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to Cart
                </>
            )}
        </button>
    );
}