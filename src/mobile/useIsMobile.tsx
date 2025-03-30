import { useContext } from "react";
import MobileContext from "./MobileContext";

export const useIsMobile = () => {
    return useContext(MobileContext);
};