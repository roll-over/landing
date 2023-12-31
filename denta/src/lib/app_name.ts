import { env } from "$env/dynamic/public";
import { z } from "zod";
import { ru } from "./localisation/denta/ru";
import { en } from "./localisation/denta/en";
export type APP_NAMES = "denta" | "femida";

export const getAppName = () => {
  const APP_NAME = (env.PUBLIC_APP_NAME || "denta") as APP_NAMES;
  z.enum(["denta", "femida"]).parse(APP_NAME);
  return APP_NAME;
};

const paramsValidator = z.object({
  availableLanguages: z.array(z.string()),
  databaseName: z.enum(["denta", "femida"]),
  availabilities: z.object({
    search: z.boolean(),
    articles: z.boolean(),
    appointments: z.boolean(),
    clients: z.boolean(),
    cabinets: z.boolean(),
    employees: z.boolean(),
    priceList: z.boolean(),
    publicPage: z.boolean(),
    contractsNotifications: z.boolean(),
  }),
});

const DENTA_APP_PARAMS: z.infer<typeof paramsValidator> = {
  availableLanguages: ["ru", "en"],
  databaseName: "denta",
  availabilities: {
    search: true,
    articles: true,
    appointments: true,
    clients: true,
    cabinets: true,
    employees: true,
    priceList: true,
    publicPage: true,
    contractsNotifications: false,
  },
};

const FEMIDA_APP_PARAMS: z.infer<typeof paramsValidator> = {
  availableLanguages: ["ru", "en"],
  databaseName: "femida",
  availabilities: {
    search: false,
    articles: false,
    appointments: false,
    clients: false,
    cabinets: false,
    employees: false,
    priceList: false,
    publicPage: false,
    contractsNotifications: true,
  },
};

paramsValidator.parse(DENTA_APP_PARAMS);
paramsValidator.parse(FEMIDA_APP_PARAMS);

export const APPS_PARAMS = {
  denta: DENTA_APP_PARAMS,
  femida: FEMIDA_APP_PARAMS,
} as const;

export const getAppParams = () => APPS_PARAMS[getAppName()];

export type DatabaseNames = z.infer<typeof paramsValidator>["databaseName"];
export const langs = {
  ru: ru,
  en: en,
} as const;

export const getLogoSrc = () =>
  ({
    denta: "/denta-logo.webp",
    femida: "/femida-logo.png",
  })[getAppName()];
