import first from "./red-flags/employee/check-cv/pochemu_moye_rezyume_ne_parsitsya_sekrety_uspekhnoy_integratsii_v_crm.md?raw";
import management_in_the_post_covid_era_Brainstorm_its_open_mic from "./its-open-mic/management_in_the_post_covid_era_Brainstorm_its_open_mic.md?raw";
import pochemu_senyory_ne_stanovyatsya_lidami from "./its-open-mic/pochemu_senyory_ne_stanovyatsya_lidami.md?raw";
import kakie_vyrazheniya_ne_stoit_ispolzovat_v_rezyume from "./red-flags/employee/check-cv/kakie_vyrazheniya_ne_stoit_ispolzovat_v_rezyume.md?raw";
import kak_aitishniku_sdelat_svoyu_rok_gruppu from "./its-open-mic/kak_aitishniku_sdelat_svoyu_rok_gruppu.md?raw";
import kak_gramotno_ukazyvat_uroven_vladenia_yazykami_v_rezume from "./red-flags/employee/check-cv/kak_gramotno_ukazyvat_uroven_vladenia_yazykami_v_rezume.md?raw";

export type Article =
  | {
      id: string;
      title: string;
      type: "md";
      source: string;
      publishDate?: string;
    }
  | {
      id: string;
      title: string;
      type: "youtube";
      description: string;
      url: string;
    };

const redFlags = {
  employee: {
    cv: {
      link: "/projects/red-flags/employee/check-cv/posts/",
      articles: [
        {
          id: "kak_gramotno_ukazyvat_uroven_vladenia_yazykami_v_rezume",
          title: "Как грамотно указывать уровень владения языками в резюме",
          type: "md",
          source: kak_gramotno_ukazyvat_uroven_vladenia_yazykami_v_rezume,
        },
        {
          id: "kakie_vyrazheniya_ne_stoit_ispolzovat_v_rezyume",
          title: "Какие выражения не стоит использовать в резюме",
          source: kakie_vyrazheniya_ne_stoit_ispolzovat_v_rezyume,
          type: "md",
        },
        {
          id: "pochemu_moye_rezyume_ne_parsitsya_sekrety_uspekhnoy_integratsii_v_crm",
          title:
            "Почему моё резюме не парсится: Секреты успешного попадания в CRMПочему моё резюме не парсится: Секреты успешного попадания в CRM",
          source: first,
          type: "md",
        },
      ],
    },
  },
};

export const articles = {
  redFlags,
  itsOpenMic: {
    link: "/projects/its-open-mic/past-events/",
    articles: [
      {
        id: "kak_aitishniku_sdelat_svoyu_rok_gruppu",
        title: "Как айтишнику сделать свою рок группу",
        type: "youtube",
        description: kak_aitishniku_sdelat_svoyu_rok_gruppu,
        url: "https://www.youtube.com/embed/aRWiMOzuysA?si=K-M4CfoXI9Bh3g3A",
      },
      {
        id: "management_in_the_post_covid_era_Brainstorm_its_open_mic",
        title: "Менеджмент в пост-ковидную эпоху",
        type: "youtube",
        description: management_in_the_post_covid_era_Brainstorm_its_open_mic,
        url: "https://www.youtube.com/embed/cnFianUi_Wg?si=gMq1GAHJNw4LIExV",
      },
      {
        id: "pochemu_senyory_ne_stanovyatsya_lidami",
        title: "Почему синьоры не становятся лидами",
        type: "youtube",
        description: pochemu_senyory_ne_stanovyatsya_lidami,
        url: "https://www.youtube.com/embed/ZXVDxZnYdtI?si=Fte1MO6dcqH2HZis",
      },
    ],
  },
  itsOpenMicPosts: {
    link: "/projects/its-open-mic/posts/",
    articles: [],
  },
  hideHire: {
    link: "/projects/hide-hire/posts/",
    articles: [],
  },
} as const;

export const articlesStacksList = [
  {
    title: "Подготовка резюме (red-flags)",
    description: "Популярные ошибки, советы и фреймворки для подготовки резюме",
    link: articles.redFlags.employee.cv.link,
  },
  {
    title: "Записи митапов (its-open-mic)",
    description:
      "Записи митапов, которые мы проводили: дополнительные материалы, полезные ссылки и записи",
    link: articles.itsOpenMic.link,
  },
  {
    title: "Все тонкости найма и поиска работы (hide-hire)",
    description: "Популярные ошибки, советы и тайны при поиске работы",
    link: "/projects/hide-hire/posts/",
  },
];
