import first from "./red-flags/employee/check-cv/pochemu_moye_rezyume_ne_parsitsya_sekrety_uspekhnoy_integratsii_v_crm.md?raw";
import management_in_the_post_covid_era_Brainstorm_its_open_mic from "./its-open-mic/management_in_the_post_covid_era_Brainstorm_its_open_mic.md?raw";
import pochemu_senyory_ne_stanovyatsya_lidami from "./its-open-mic/pochemu_senyory_ne_stanovyatsya_lidami.md?raw";
const redFlags = {
  employee: {
    cv: {
      link: "/projects/red-flags/employee/check-cv/posts/",
      articles: [
        {
          id: "pochemu_moye_rezyume_ne_parsitsya_sekrety_uspekhnoy_integratsii_v_crm",
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
        id: "management_in_the_post_covid_era_Brainstorm_its_open_mic",
        type: "youtube",
        description: management_in_the_post_covid_era_Brainstorm_its_open_mic,
        url: "https://www.youtube.com/embed/cnFianUi_Wg?si=gMq1GAHJNw4LIExV",
      },
      {
        id: "pochemu_senyory_ne_stanovyatsya_lidami",
        type: "youtube",
        description: pochemu_senyory_ne_stanovyatsya_lidami,
        url: "https://www.youtube.com/embed/ZXVDxZnYdtI?si=Fte1MO6dcqH2HZis",
      },
    ],
  },
};