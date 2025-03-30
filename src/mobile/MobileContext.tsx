import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Create a context
const MobileContext = createContext<boolean | undefined>(undefined);

export default MobileContext;

export const MobileProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  );
};


