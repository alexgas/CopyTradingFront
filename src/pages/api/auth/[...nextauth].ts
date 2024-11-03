import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { User as MyUser } from "@/interfaces/user.interface";

async function sendGoogleAuthRequest(data: { email: string; idToken: string }) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function createUser(email: string, accessToken: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email }),
  });
}

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
    async session({ session, token }: any) {
      // Añade nickname al objeto de session
      // console.log("SESSION METHOD");
      // console.log("el token de session method: ", token);
      session.user.nickName = token?.userData?.nickName as string;
      session.user.apiExchangeToken = token?.userData?.apiExchangeToken as string;
      // session.user.nickName = token.nickName as string;
      return session;
    },
    async jwt({ token, user, trigger, session}: { token: any; user?: any; trigger?: string; session?: any }) {
       console.log("JWT METHOD token", token);
       console.log("JWT METHOD session", session);
       if (trigger === "update") {
         // Note, that `session` can be any arbitrary object, remember to validate it!
         token.userData = {
          nickName: session.nickName ? session.nickName : token.userData?.nickName,
          apiExchangeToken: session.apiExchangeToken ? session.apiExchangeToken : token.userData?.apiExchangeToken
          //... more properties 
        };
        }
        
        // Solo se ejecuta en el primer login
      if (user) {
        // Obtén el nickname del usuario desde la base de datos o el propio objeto `user`
        // const userFromDb = await getUserFromDatabase(user.id);
        // TODO get from DB
        console.log("JWT METHOD on the first login", user);

        token.userData = {
          nickName: user.nickName,
          apiExchangeToken: user.apiExchangeToken
          //... more properties 
        };
      }
      return token;
    },

    async signIn({ account, profile, user }: any) {
      console.log("SIGNIN METHOD");

      if (account.provider === "google") {
        let createdUserData: MyUser = {
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

          const response = await sendGoogleAuthRequest(data);

          if (!response.ok) {
            return false;
          }

          const responseData = await response.json();
          console.log(responseData);
          if (responseData.isVerified) {
            const createdUser = await createUser(
              profile.email,
              account.access_token
            );

            if (!createdUser.ok) {
              return false;
            }
            createdUserData = await createdUser.json();
            console.log("createdUserData", createdUserData);

            user.nickName = createdUserData.nickName;
            user.apiExchangeToken = createdUserData.apiExchangeToken;
           
            // Faking usernickname and apiExchangeToken
            // user.nickName = createdUserData.nickName ? createdUserData.nickName : "elAlex";
            // user.apiExchangeToken = createdUserData.apiExchangeToken ? createdUserData.apiExchangeToken : "123123123";
            console.log("user definid on signin", user);

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
