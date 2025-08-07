"use client";


import Link from "next/link";
import { User, ShoppingBag, Settings, LogOut, Store } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";

type UserButtonProps = {
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  } | null;
};

export default function UserButton({ user }: UserButtonProps) {
    return (
        <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
                <button
                    className="rounded-full cursor-pointer"
                    aria-haspopup="true"
                    aria-label="Open user menu"
                >
                    <Image
                        src={user?.image || ""}
                        alt={user?.name || ""}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="sr-only">User Menu</span>
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal container={typeof window !== "undefined" ? document.body : undefined}>
                <DropdownMenu.Content
                    className="mt-1 max-w-96 w-fit rounded-md bg-white shadow-lg border-gray-200 border z-50 p-0 overflow-visible"
                    sideOffset={6}
                    align="end"
                >
                    <div className="py-1">
                        <div className="mx-2.5 my-1 mb-2">
                            <h3 className="text-sm font-semibold">{user?.name}</h3>
                            <p className="text-xs text-gray-500 -mt-0.5">{user?.email}</p>
                        </div>
                        <hr className="my-1 border-gray-200" />
                        <DropdownMenu.Item asChild>
                            <Link href="/dashboard" className="px-2 mx-1 py-1.5 text-sm hover:bg-gray-100 text-black rounded-md flex items-center">
                                <Store className="inline h-4 w-4 mr-3 text-gray-500" />
                                Dashboard
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                            <Link href="/profile" className="px-2 mx-1 py-1.5 text-sm hover:bg-gray-100 text-black rounded-md flex items-center">
                                <User className="inline h-4 w-4 mr-3 text-gray-500" />
                                Profile
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                            <Link href="/orders" className="px-2 mx-1 py-1.5 text-sm hover:bg-gray-100 text-black rounded-md flex items-center">
                                <ShoppingBag className="inline h-4 w-4 mr-3 text-gray-500" />
                                My Orders
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                            <Link href="/settings" className="px-2 mx-1 py-1.5 text-sm hover:bg-gray-100 text-black rounded-md flex items-center">
                                <Settings className="inline h-4 w-4 mr-3 text-gray-500" />
                                Settings
                            </Link>
                        </DropdownMenu.Item>
                        <hr className="my-1 border-gray-200" />
                        <DropdownMenu.Item asChild>
                            <a onClick={() => signOut()} className="px-2 mx-1 py-1.5 text-sm hover:bg-gray-100 text-black rounded-md flex items-center cursor-pointer">
                                <LogOut className="inline h-4 w-4 mr-3 text-gray-500" />
                                <span className="text-destructive">Sign Out</span>
                            </a>
                        </DropdownMenu.Item>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}