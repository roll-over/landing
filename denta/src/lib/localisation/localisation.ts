import { en } from "./en";
import { ru } from "./ru";

const langs = {
  ru,
  en,
} as const;
if (Object.keys(ru).length !== Object.keys(en).length) {
  const ruKeys = Object.keys(ru);
  const enKeys = Object.keys(en);
  const ruKeysSet = new Set(ruKeys);
  const enKeysSet = new Set(enKeys);
  const ruDiff = ruKeys.filter((x) => !enKeysSet.has(x));
  const enDiff = enKeys.filter((x) => !ruKeysSet.has(x));
  throw new Error(
    `Different keys in languages: ru: ${ruDiff.join(", ")}, en: ${enDiff.join(", ")}`,
  );
}

export const localisation = (lang: string) => {
  if (!langs[lang]) {
    throw new Error(`Unknown language: ${lang}`);
  }
  return (key: keyof typeof ru) => {
    const localisation = langs[lang][key];

    if (!localisation) {
      throw new Error(`Unknown localisation key: ${key}`);
    }

    return localisation as string;
  };
};
