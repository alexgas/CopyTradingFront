import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "email",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        try {
          const data = {
            email: profile.email,
            idToken: account.id_token,
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (!response.ok) {
            return false;
          }

          const responseData = await response.json();

          if (responseData.isVerified) {
            const createdUser = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${account.access_token}`,
                },
                body: JSON.stringify({ email: profile.email }),
              }
            );

            if (!createdUser.ok) {
              return false;
            }

            const createdUserData = await createdUser.json();
            //TODO createdUserData debe ir al context de user. 

            redirect("/", createdUserData.nickName);

            return createdUserData;
          }
        } catch (error) {
          throw new Error("Failed to fetch");
        }
      }

      return false;
    },
  },
};

export default NextAuth(authOptions);
