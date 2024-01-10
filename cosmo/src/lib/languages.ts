import { t } from "./backend/localisation";
export const getAvailableReceptionsLanguages = async (lang) => [
  { value: "ru", label: await t("Русский", "ru", lang) },
  {
    value: "en",
    label: await t("Английский", "ru", lang),
  },
  {
    value: "kg",
    label: await t("Кыргызский", "ru", lang),
  },
];
