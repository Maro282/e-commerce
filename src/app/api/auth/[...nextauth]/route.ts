import { login } from "@/services/auth.services";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: " x x x x x ",
        },
      },

      async authorize(credentials) {
        const response = await login(
          credentials?.email ?? "",
          credentials?.password ?? ""
        );

        if (response.message == "success") {
          const user = {
            id: response.user.email,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            token: response.token,
          };
          console.log(user);
          return user; // if true will redirect me somewhere which will be handled then
        } else {
          return null; // if null will gtell me that there is an error
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.token = token.token as string;
      return session;
    },

    async jwt({ user, token }) {
      if (user) {
        token.token = user.token;
        token.role = user.role;
      }
      return token;
    },
  },
};

// providers: [
//   CredentialsProvider({
//     name: "credentials",

//     credentials: {
//       email: { type: "text" },
//       password: { type: "password" },
//     },

//     async authorize(credentials) {
//       const response = await fetch(
//         "https://ecommerce.routemisr.com/api/v1/auth/signin",
//         {
//           method: "post",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify(credentials),
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         return data;
//       }

//       return null;
//     },
//   }),
// ],

// session: {
//   strategy: "jwt",
// },

// secret: process.env.AUTH_SECRET,

// pages: {
//   signIn: "/login",
// },

// callbacks: {
//   async session({ session, user, token }) {
//     return { ...session, ...user, ...token };
//   },
//   async jwt({ token, user }) {
//     return { ...user, ...token };
//   },
// },

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
