"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

type ConsentContextType = {
  consent: boolean;
  setConsent: (value: boolean) => void;
  isReady: boolean;
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [consent, setConsentState] = useState(false);
  //make sure we first load before react hydrates
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("consent") === "true";
    setConsentState(cookieConsent);
    setIsReady(true);
  }, []);

  const setConsent = (value: boolean) => {
    Cookies.set("consent", value.toString(), { expires: 365 });
    setConsentState(value);
  };

  return (
    <ConsentContext.Provider value={{ consent, setConsent, isReady }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
    const context = useContext(ConsentContext);
    if(!context) throw new Error("useConsent must be used within ConsentProvider");
    return context;
}