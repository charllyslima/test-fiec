import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios");
                }

                // Buscar usuário no banco de dados
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !(await compare(credentials.password, user.password))) {
                    throw new Error("Credenciais inválidas");
                }

                return { id: user.id, name: user.name, email: user.email };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt" as const, // ✅ Corrige o erro de tipagem
    },
    pages: {
        signIn: "/login"
    }
};

// Exportando o handler correto para Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
