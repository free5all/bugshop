"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

type SignInWithProviderButtonProps = {
    provider: "google";
}

export default function SignInWithProviderButton({ provider }: SignInWithProviderButtonProps) {
    return (
        <button
            onClick={() => signIn(provider, { redirectTo: "/" })}
            className="w-full inline-flex items-center justify-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
        >
            <Image
                src="https://google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
            />
            Sign in with Google
        </button>

    );
}