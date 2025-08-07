"use client";

import { User } from "lucide-react";
import { signIn } from "next-auth/react";


export default function SignInButton() {
    return (
        <button
            className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 text-green-700 hidden sm:flex hover:text-green-800 hover:bg-accent cursor-pointer"
            onClick={async () => await signIn()}
        >
            <User className="h-4 w-4 mr-1" />
            <span className="hidden lg:inline">Sign In</span>
        </button>
    );
}