import { appParams } from "$lib/app_name";
const langs = appParams.localisation;

if (Object.keys(langs.ru).length !== Object.keys(langs.en).length) {
  const ruKeys = Object.keys(langs.ru);
  const enKeys = Object.keys(langs.en);
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
  return (key: keyof typeof langs.ru) => {
    const localisation = langs[lang][key];

    if (!localisation) {
      throw new Error(`Unknown localisation key: ${key}`);
    }

    return localisation as string;
  };
};
