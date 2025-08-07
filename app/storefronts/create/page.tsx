"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { Store, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateStorefront() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/storefronts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description }),
            });

            if (response.ok) {
                const { storefront } = await response.json();
                router.push(`/storefronts/${storefront.id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to create storefront");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50">
            <Header>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <SignInButton />
                    <UserButton user={null} />
                </div>
            </Header>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
                    <div className="flex items-center mb-6">
                        <div className="bg-green-100 rounded-full p-3 mr-4">
                            <Store className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create Your Storefront</h1>
                            <p className="text-gray-600">Start selling your arthropods and supplies</p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <p className="text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Storefront Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="e.g., Arachnid Artisans"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                placeholder="Tell customers about your storefront, specialties, and experience..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <h3 className="text-sm font-medium text-blue-800 mb-2">Next Steps</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Connect your Stripe account to receive payments</li>
                                <li>• Add your first products to start selling</li>
                                <li>• Customize your storefront profile</li>
                            </ul>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link
                                href="/"
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isLoading || !name.trim()}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? "Creating..." : "Create Storefront"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}