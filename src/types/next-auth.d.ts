// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickName: string | null;
      email: string;
      apiExchangeToken?: string;
      // Otros campos del usuario
    };
  }
}
