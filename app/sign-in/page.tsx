import { auth } from "@/auth";
import Header from "@/lib/components/Header";
import SignInWithProviderButton from "@/lib/components/SignInWithProviderButton";
import { ArrowLeft, Award, Shield, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await auth();

    if (session) {
        return redirect("/");
    }

    return (
        <div className="min-h-screen bg-green-50 flex flex-col">
            <Header>
                <Link href="/" className="flex items-center text-green-700 hover:text-green-800 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Home
                </Link>
            </Header>

            <div className="flex flex-1">
                <main className="flex-1 flex items-center justify-center p-4 lg:p-16">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                            <p className="text-gray-600">Sign in to your ArthropodShop account using your preferred provider</p>
                        </div>
                        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 border-green-100 shadow-lg">
                            <div className="text-center space-y-1.5">
                                <h3 className="font-semibold text-2xl text-center text-green-800">Sign In</h3>
                                <p className="text-center text-gray-600 text-sm">Choose your preferred sign-in method</p>
                            </div>

                            <div className="px-6">
                                <div className="space-y-4">
                                    <SignInWithProviderButton provider="google" />
                                </div>
                            </div>

                            <hr className="border-t border-gray-100 mx-8" />

                            <div className="px-6 space-y-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-start space-x-3">
                                        <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-green-800 font-medium">Secure OAuth Authentication</p>
                                            <p className="text-xs text-green-700 mt-1">We use industry-standard OAuth protocols to keep your account secure. We never store your passwords.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-xs text-gray-500 mt-4">
                                    By signing in, you agree to our <Link href="/terms" className="text-green-600 hover:text-green-500">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:text-green-500">Privacy Policy</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="hidden lg:flex flex-1 bg-green-800 items-center justify-center p-16 text-white">
                    <div className="max-w-md">
                        <h3 className="text-3xl text-center font-bold mb-8">Join the ArthropodShop Community</h3>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-700 rounded-full p-3 flex-shrink-0">
                                    <Shield className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Verified Sellers</h4>
                                    <p className="text-green-100">
                                        Shop with confidence from our network of trusted, verified breeders and suppliers.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-700 rounded-full p-3 flex-shrink-0">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Expert Community</h4>
                                    <p className="text-green-100">
                                        Connect with experienced keepers, get advice, and share your passion for invertebrates.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-700 rounded-full p-3 flex-shrink-0">
                                    <Award className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Quality Guarantee</h4>
                                    <p className="text-green-100">
                                        Shop with confidence from our network of trusted, verified breeders and suppliers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 p-6 bg-green-700/50 rounded-lg">
                            <p className="text-green-100 text-center italic">
                                &quot;ArthropodShop has connected me with amazing breeders and helped me build the perfect habitat for my collection.&quot;
                            </p>
                            <p className="text-green-200 text-center mt-2 font-semibold">
                                - Sarah K., Verified Buyer
                            </p>
                        
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}