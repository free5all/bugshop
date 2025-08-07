import { auth } from "@/auth";
import { db } from "@/lib/server/db";
import { orders, orderItems, products, storefronts } from "@/lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import Header from "@/lib/components/Header";
import UserButton from "@/lib/components/UserButton";
import { Package, Calendar, CreditCard, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
    const session = await auth();
    
    if (!session || !session.user?.id) {
        redirect("/sign-in");
    }

    // Get user's orders with order items, products, and storefront details
    const userOrders = await db
        .select({
            order: orders,
            storefront: storefronts,
        })
        .from(orders)
        .leftJoin(storefronts, eq(orders.storefrontId, storefronts.id))
        .where(eq(orders.userId, session.user.id))
        .orderBy(desc(orders.createdAt));

    // Get order items for each order
    const ordersWithItems = await Promise.all(
        userOrders.map(async (orderData) => {
            const items = await db
                .select({
                    orderItem: orderItems,
                    product: products,
                })
                .from(orderItems)
                .leftJoin(products, eq(orderItems.productId, products.id))
                .where(eq(orderItems.orderId, orderData.order.id));

            return {
                ...orderData,
                items,
            };
        })
    );

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-emerald-100 text-emerald-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header>
                <div className="flex items-center space-x-4">
                    {session && session.user && (
                        <UserButton user={session.user} />
                    )}
                </div>
            </Header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center text-sm text-green-600 hover:text-green-800 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </Link>
                    
                    <div className="flex items-center space-x-3">
                        <Package className="h-8 w-8 text-green-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-gray-600">Track and manage your order history</p>
                        </div>
                    </div>
                </div>

                {ordersWithItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6">You haven&apos;t placed any orders yet. Start shopping to see your orders here.</p>
                        <Link 
                            href="/" 
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {ordersWithItems.map((orderData) => (
                            <div key={orderData.order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
                                            <div>
                                                <p className="text-sm text-gray-600">Order ID</p>
                                                <p className="font-mono text-sm font-semibold text-gray-900">
                                                    #{orderData.order.id.slice(-8).toUpperCase()}
                                                </p>
                                            </div>
                                            <div className="mt-2 lg:mt-0">
                                                <p className="text-sm text-gray-600">Date Placed</p>
                                                <p className="text-sm font-medium text-gray-900 flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {formatDate(new Date(orderData.order.createdAt))}
                                                </p>
                                            </div>
                                            <div className="mt-2 lg:mt-0">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-lg font-bold text-gray-900 flex items-center">
                                                    <CreditCard className="h-4 w-4 mr-1" />
                                                    ${orderData.order.totalAmount}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(orderData.order.status)}`}>
                                                {orderData.order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Storefront Info */}
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">Sold by</span>
                                        <Link 
                                            href={`/storefronts/${orderData.storefront?.id}`}
                                            className="text-sm font-medium text-green-600 hover:text-green-800"
                                        >
                                            {orderData.storefront?.name}
                                        </Link>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-6 py-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h4>
                                    <div className="space-y-4">
                                        {orderData.items.map((item) => (
                                            <div key={item.orderItem.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Package className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium text-gray-900">{item.product?.name}</h5>
                                                        <p className="text-sm text-gray-600">Quantity: {item.orderItem.quantity}</p>
                                                        <p className="text-sm text-gray-600">Price: ${item.orderItem.price} each</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        ${(parseFloat(item.orderItem.price) * item.orderItem.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Actions */}
                                {orderData.order.status === 'paid' && (
                                    <div className="bg-gray-50 px-6 py-4">
                                        <p className="text-sm text-gray-600">
                                            Your order has been confirmed. The seller will process and ship your items shortly.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}