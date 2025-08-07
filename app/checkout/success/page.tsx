"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { CheckCircle, Package, Home } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Here you could verify the payment with Stripe and update order status
        // For now, we'll just set loading to false after a brief delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [sessionId]);

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
                    <div className="text-center">Processing payment...</div>
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

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-8 text-center">
                    <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for your order. Your payment has been processed successfully.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                        <div className="flex items-start">
                            <Package className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                            <div className="text-left">
                                <h3 className="text-sm font-medium text-green-800">What&apos;s Next?</h3>
                                <ul className="text-sm text-green-700 mt-1 space-y-1">
                                    <li>• The seller will receive notification of your order</li>
                                    <li>• You&apos;ll receive an email confirmation shortly</li>
                                    <li>• Tracking information will be provided when your order ships</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {sessionId && (
                        <div className="text-sm text-gray-500 mb-6">
                            Order Reference: {sessionId.slice(-8)}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                        >
                            <Home className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                        
                        <div>
                            <Link
                                href="/orders"
                                className="inline-flex items-center px-4 py-2 text-green-600 hover:text-green-800 transition-colors"
                            >
                                View My Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}