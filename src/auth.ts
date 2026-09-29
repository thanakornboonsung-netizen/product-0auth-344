import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    // เติม: provider ของ Google ที่ import มาด้านบน 
    providers: [Google,GitHub],
    callbacks: {
        authorized({ auth, request }) {
            const pathname = request.nextUrl.pathname;
            const isProductManagementPage =
                /^\/products\/[^/]+\/(edit|delete)$/.test(pathname);
            if (isProductManagementPage) {
                return Boolean(auth?.user);
            }
            return true;
        },
    },
}); 