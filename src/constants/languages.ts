export const languages = [
  { text: "English", code: "en", icon: "En" },
  { text: "Sinhala", code: "si", icon: "සිං" },
  { text: "Tamil", code: "tm", icon: "த" },
] as const;

export type Lang = typeof languages[number];

export type Language = {
  [code in Lang["code"]]?: string;
};
