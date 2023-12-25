import { env } from "$env/dynamic/public";
import { z } from "zod";
import { ru } from "./localisation/denta/ru";
import { en } from "./localisation/denta/en";

export type APP_NAMES = "denta" | "femida";

export const APP_NAME = env.PUBLIC_APP_NAME || "denta";
console.log("APP_NAME", APP_NAME, env.PUBLIC_APP_NAME);
z.enum(["denta", "femida"]).parse(APP_NAME);

const paramsValidator = z.object({
  availableLanguages: z.array(z.string()),
  databaseName: z.enum(["denta", "femida"]),
  availabilities: z.object({
    search: z.boolean(),
    articles: z.boolean(),
  }),
  localisation: z.object({
    ru: z.record(z.string(), z.string()),
    en: z.record(z.string(), z.string()),
  }),
});

const DENTA_APP_PARAMS: z.infer<typeof paramsValidator> = {
  availableLanguages: ["ru", "en"],
  databaseName: "denta",
  availabilities: {
    search: true,
    articles: true,
  },
  localisation: {
    ru: ru,
    en: en,
  },
};

const FEMIDA_APP_PARAMS: z.infer<typeof paramsValidator> = {
  availableLanguages: ["ru", "en"],
  databaseName: "femida",
  availabilities: {
    search: false,
    articles: false,
  },
  localisation: {
    ru: ru,
    en: en,
  },
};

paramsValidator.parse(DENTA_APP_PARAMS);
paramsValidator.parse(FEMIDA_APP_PARAMS);

export const APPS_PARAMS = {
  denta: DENTA_APP_PARAMS,
  femida: FEMIDA_APP_PARAMS,
} as const;

console.log("APP_NAME", APP_NAME);

export const appParams = APPS_PARAMS[APP_NAME];
export type DatabaseNames = z.infer<typeof paramsValidator>["databaseName"];
console.log("appParams", appParams.availabilities);
