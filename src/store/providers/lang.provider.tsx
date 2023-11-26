import { createContext, FC, useContext, useState } from "react";
import { Lang as LangCode } from "../../constants/languages";
import React from "react";

type Lang = {
  code: LangCode["code"];
  update?: (code: LangCode["code"]) => void;
};
export const LanguageContext = createContext<Lang>({ code: "en" });


interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language_code") || "en"
  );

  const update = (code: LangCode["code"]) => {
    setLanguage(code);
    localStorage.setItem("language_code", code);
  };

  return (
    // @ts-ignore
    <LanguageContext.Provider value={{ code: language, update }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
