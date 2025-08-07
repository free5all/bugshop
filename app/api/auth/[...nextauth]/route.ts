import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter your username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            authorize: async (credentials) => {
                // Here you would typically fetch user data from your database
                // For demonstration, we'll just return a mock user object
                if (credentials?.username === "user" && credentials.password === "pass") {
                    return { id: 'admin', name: "User", email: "user@example.com" };
                }
                return null;
            }
        })
    ],
    // pages: {
    //     signIn: '/auth/sign-in',
    //     newUser: '/auth/sign-up',
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };