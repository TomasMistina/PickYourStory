import { useContext } from "react";
import AuthContext, { AuthContextType } from "./AuthProvider";

const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export default useAuth;
