import type { availableCurrencies } from "$lib/currencies";

export type Language = "ru";

export type City = {
  value: string;
  label: string;
};

export type Country = {
  value: string;
  label: string;
};

export type Contact = {
  type:
    | "email"
    | "phone"
    | "vk"
    | "facebook"
    | "instagram"
    | "telegram"
    | "whatsapp"
    | "viber"
    | "skype"
    | "other";
  value: string;
};

export type Address = {
  country: string;
  city: string;
  street: string;
  house: string;
  links: Link[];
};

export type ShortAddress = {
  country: Address["country"];
  city: Address["city"];
};

export type Company = {
  id: string;
  owner: string;
  name: string;
  createdAt: string;
  contacts: Contact[];
  workingHours: {
    startAt: string;
    endAt: string;
    step: number;
  };
  mainAddress: Address;
};

export type Client = {
  id: string;
  companyId: Company["id"];
  name: string;
  createdAt: string;
  contacts: Contact[];
};

export type Doctor = {
  id: string;
  companyId: Company["id"];
  name: string;
  createdAt: string;
  contacts: Contact[];
};

export type Link = {
  type: "google" | "yandex" | "2gis";
  value: string;
};

export type Cabinet = {
  id: string;
  companyId: Company["id"];
  name: string;
  createdAt: string;
  contacts: Contact[];
  address: Address;
};

export type Service = {
  id: string;
  name: string;
  description?: string;
};

export type PriceListItem = {
  id: string;
  companyId: Company["id"];
  serviceId: Service["id"];
  price: number;
  currency: (typeof availableCurrencies)[number];
};

export type Appointment = {
  id: string;
  companyId: Company["id"];
  clientId: Client["id"];
  doctorId: Doctor["id"];
  cabinetId: Cabinet["id"];
  servicesIds: Service["id"][];
  price: number;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
};
