import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        try {
          if (!credentials) throw new Error("no credentials to log in as");
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          return { username, password } as any;
        } catch (ignored) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.username) {
        params.token.username = params.user.username;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { name: string }).name = token.username as string;
      }
      return session;
    },
  },
};
const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
