"use client";

import { User } from "lucide-react";
import { signIn } from "next-auth/react";

type SignInWithProviderButtonProps = {
    provider: "google";
}

export default function SignInWithProviderButton({ provider }: SignInWithProviderButtonProps) {
    return (
        <button
            onClick={() => signIn(provider, { redirectTo: "/" })}
            className="w-full inline-flex items-center justify-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
        >
            <img
                src="https://google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5 mr-2"
            />
            Sign in with Google
        </button>

    );
}