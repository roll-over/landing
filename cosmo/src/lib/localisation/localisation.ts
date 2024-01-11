const langs = {
  ru: {
    "Созвездие CRM-систем": "Созвездие CRM-систем",
    "Созвездие CRM-систем — это сервис, где вы можете найти подходящую CRM-систему для вашего бизнеса.":
      "Созвездие CRM-систем — это сервис, где вы можете найти подходящую CRM-систему для вашего бизнеса.",
    "CRM-система для стоматологий": "CRM-система для стоматологий",
    "CRM-система для юристов": "CRM-система для юристов",
    Документы: "Документы",
    "Политика в отношении файлов cookie": "Политика в отношении файлов cookie",
    "Политика конфиденциальности": "Политика конфиденциальности",
    "Пользовательское соглашение": "Пользовательское соглашение",
    "Нормативные документы": "Нормативные документы",
    "Обратно к документам": "Обратно к документам",
  },
  en: {
    "Созвездие CRM-систем": "Constellation of CRM systems",
    "Созвездие CRM-систем — это сервис, где вы можете найти подходящую CRM-систему для вашего бизнеса.":
      "Constellation of CRM systems is a service where you can find a suitable CRM system for your business.",
    "CRM-система для стоматологий": "CRM system for dentistry",
    "CRM-система для юристов": "CRM system for lawyers",
    Документы: "Documents",
    "Политика в отношении файлов cookie": "Cookie Policy",
    "Политика конфиденциальности": "Privacy Policy",
    "Пользовательское соглашение": "User Agreement",
    "Нормативные документы": "Regulatory documents",
    "Обратно к документам": "Back to documents",
  },
};

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
      console.error(`Unknown localisation key: ${key}`);
      return key;
    }

    return localisation as string;
  };
};
