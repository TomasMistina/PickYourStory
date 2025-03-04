import { ReactNode, createContext, useState } from "react";

export type AuthContextType = {
  currentUser: string | null | undefined;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  currentUserId: string | null | undefined;
  setCurrentUserId: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};

const initialAuthContext: AuthContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  currentUserId: null,
  setCurrentUserId: () => {},
};

// Create context with initial values
const AuthContext = createContext<AuthContextType>(initialAuthContext);

type Props = {
  children: ReactNode;
};

//The children nested in this Context Provider have received the context
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<string | null>();
  const [currentUserId, setCurrentUserId] = useState<string | null>();

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, currentUserId, setCurrentUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
