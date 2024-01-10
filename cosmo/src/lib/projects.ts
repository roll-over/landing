import HikkithonLogo from "$lib/assets/logos/hikkithon.png";
import OpenMic from "$lib/assets/logos/its-open-mic.jpg";
import RedFlags from "$lib/assets/logos/red-flags.jpg";
import HideHire from "$lib/assets/logos/hide-hire.png";
import SimplePsychologist from "$lib/assets/logos/simple-psychologist.png";

export const Status = {
  comingSoon: "coming-soon",
  releasedFirstVersion: "releasedFirstVersion",
  closed: "closed",
} as const;

export const Owners = {
  rollOver: "roll-over",
  friends: "friends",
};

export const projects = [
  {
    href: "/projects/hikkithon",
    title: "HikkiThon",
    description: "Свободный онлайн хакатон",
    status: Status.comingSoon,
    logo: HikkithonLogo,
    owner: Owners.rollOver,
  },
  {
    href: "/projects/red-flags",
    title: "red-flags",
    status: Status.closed,
    description: "Твой консультант при поиске работы",
    logo: RedFlags,
    owner: Owners.rollOver,
  },
  {
    href: "/projects/hide-hire",
    title: "hide-hire",
    description: "Сервис поиска работы и кандидатов",
    status: Status.comingSoon,
    logo: HideHire,
    owner: Owners.rollOver,
  },
  {
    href: "/projects/simple-psychologist",
    title: "simple-psychologist",
    description: "Бот для психологической помощи",
    status: Status.releasedFirstVersion,
    logo: SimplePsychologist,
    owner: Owners.rollOver,
  },
  {
    href: "/projects/its-open-mic",
    title: "IT’s-open-mic",
    description: "Открытая онлайн-платформа для проведения выступлений об или около IT.",
    status: Status.releasedFirstVersion,
    logo: OpenMic,
    owner: Owners.rollOver,
  },
  {
    href: "https://www.notion.so/HRBRO-43bdc175552446aca06d254a867b11b9?pvs=21",
    title: "HRBRO",
    status: Status.releasedFirstVersion,
    description: "Школа поисков работы",
    logo: "",
    owner: Owners.friends,
  },
  {
    href: "https://www.notion.so/c013d9003b6f408e993c14e4317a7f40?pvs=21",
    title: "Гайды",
    status: Status.closed,
    description: "Подробное описание хаотичных процессов",
    logo: "",
    owner: Owners.rollOver,
  },
] as const;

export type Project = (typeof projects)[number];

export type ProjectsTitles = (typeof projects)[number]["title"];
