import Link from "next/link";
import { Bug } from "lucide-react";

type HeaderProps = {
    children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link className="flex items-center space-x-2" href="/">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <span className="text-white font-semibold">
                                <Bug className="h-6 w-6 text-white" />
                            </span>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-green-800">ArthropodShop</span>
                    </Link>
                    <>
                        {children}
                    </>
                </div>
            </div>
        </header>
    );
}
