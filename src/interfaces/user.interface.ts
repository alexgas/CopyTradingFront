export interface User {
    id: string;
    nickName: string | null;
    email: string;
    apiExchangeToken?: string;
    timestampable: {
        createdAt: Date;
        updatedAt: Date;
    }
  }
  
  
export type UserContextType = {
    loggedUser: User | null;
    actualUser: User |null;
    setUserLogged: (newUser: User) => void;
    setActualUser: (newUser: User) => void;
  };