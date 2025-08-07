"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 text-green-700 hidden sm:flex hover:text-green-800 hover:bg-accent cursor-pointer"
            onClick={() => signOut()}
        >
            <span className="hidden lg:inline">Sign Out</span>
        </button>
    );
}