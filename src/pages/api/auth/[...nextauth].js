import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email'
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      
      if (account.provider === "google") {
        try {
          const data = {
            email: profile.email,
            idToken: account.id_token,
          };

          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            return false;
          }
      
          const responseData = await response.json();

          if (responseData.isVerified) {
            const createdUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${account.access_token}`,
              },
              body: JSON.stringify({ email: profile.email }),
            });
          }

          return responseData.isVerified;

        } catch (error) {
          throw new Error("Failed to fetch");
        }
      }

      return false
    },
    
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  }
};

export default NextAuth(authOptions);
