"use client";
import { User, UserContextType } from "@/interfaces/user.interface";
import { createContext, useState } from "react";
export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const setUserLogged = (user: User) => {
    setLoggedUser(user);
  };

  const setActualUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        actualUser: currentUser,
        loggedUser: null,
        setActualUser,
        setUserLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;
export default UserProvider;
