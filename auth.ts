import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/server/db/index";
import * as tables from "@/lib/server/db/schema";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Google],
    pages: {
        signIn: '/sign-in',
    },
    adapter: DrizzleAdapter(db, {
        usersTable: tables.users,
        accountsTable: tables.accounts,
        sessionsTable: tables.sessions,
        verificationTokensTable: tables.verificationTokens,
    }),
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            return true;
        }
    },
    session: {
        strategy: "database",
    }
});