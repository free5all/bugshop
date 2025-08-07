"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import SignInButton from "@/lib/components/SignInButton";
import { Store, Package, Plus, ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description?: string;
    price: string;
    quantity: number;
    status: string;
    createdAt: string;
}

interface Storefront {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
}

export default function ManageStorefront() {
    const params = useParams();
    const storefrontId = params.id as string;

    const [storefront, setStorefront] = useState<Storefront | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [error, setError] = useState("");

    // Product form state
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        quantity: 1,
    });

    const fetchStorefront = useCallback(async () => {
        try {
            const response = await fetch("/api/storefronts");
            if (response.ok) {
                const { storefronts } = await response.json();
                const currentStorefront = storefronts.find((s: { storefront: { id: string } }) => s.storefront.id === storefrontId);
                if (currentStorefront) {
                    setStorefront(currentStorefront.storefront);
                }
            }
        } catch (err) {
            console.error("Error fetching storefront:", err);
        }
    }, [storefrontId]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`/api/products?storefrontId=${storefrontId}`);
            if (response.ok) {
                const { products } = await response.json();
                setProducts(products);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setIsLoading(false);
        }
    }, [storefrontId]);

    useEffect(() => {
        fetchStorefront();
        fetchProducts();
    }, [fetchStorefront, fetchProducts]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...productForm,
                    storefrontId,
                }),
            });

            if (response.ok) {
                setProductForm({ name: "", description: "", price: "", quantity: 1 });
                setShowAddProduct(false);
                fetchProducts(); // Refresh products list
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to add product");
            }
        } catch {
            setError("Network error. Please try again.");
        }
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
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">Loading storefront...</div>
                </div>
            </div>
        );
    }

    if (!storefront) {
        return (
            <div className="min-h-screen bg-green-50">
                <Header>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <SignInButton />
                        <UserButton user={null} />
                    </div>
                </Header>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    href={`/storefronts/${storefrontId}`}
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Storefront
                </Link>

                {/* Storefront Header */}
                <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8 mb-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 rounded-full p-3">
                                <Store className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Manage {storefront.name}</h1>
                                <p className="text-gray-600">Add and manage your products</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddProduct(!showAddProduct)}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {/* Add Product Form */}
                {showAddProduct && (
                    <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        placeholder="e.g., Chilean Rose Hair Tarantula"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Describe your product..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={productForm.quantity}
                                    onChange={(e) => setProductForm({ ...productForm, quantity: parseInt(e.target.value) || 1 })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddProduct(false)}
                                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Products List */}
                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Products ({products.length})</h2>
                    
                    {products.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">No products yet</h3>
                            <p className="text-gray-500 mb-4">Add your first product to start selling</p>
                            <button
                                onClick={() => setShowAddProduct(true)}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                            {product.description && (
                                                <p className="text-gray-600 mt-1">{product.description}</p>
                                            )}
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                <span className="font-medium text-green-600">${product.price}</span>
                                                <span>Qty: {product.quantity}</span>
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    product.status === 'available' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {product.status}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600 p-2">
                                            <Edit className="h-4 w-4" />
                                        </button>
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