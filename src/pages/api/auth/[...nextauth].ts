import { User } from "@/interfaces/user.interface";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
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
    async session({ session, token }: { session: Session; token: JWT }) {
      // Añade nickname al objeto de session
      session.user.nickName = token.nickName as string;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      // Solo se ejecuta en el primer login
      if (user) {
        // Obtén el nickname del usuario desde la base de datos o el propio objeto `user`
        // const userFromDb = await getUserFromDatabase(user.id);
        // TODO get from DB
        token.nickName = "alex";
      }
      return token;
    },
    
    
    async signIn({ account, profile }: any) {
      console.log("signim - account", account);
      console.log("signim - profile", profile);

      if (account.provider === "google") {
        let createdUserData: User = {
          id: "",
          nickName: null,
          email: "",
          timestampable: {
            createdAt: undefined,
            updatedAt: undefined,
          },
        };
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
          console.log(responseData);
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
            createdUserData = await createdUser.json();
            console.log("createdUserData", createdUserData);

           return true;
          }
        } catch (error) {
          console.error(error);
          throw new Error("Failed to fetch");
        }
      }

      return false;
    },



  },
};

export default NextAuth(authOptions);
