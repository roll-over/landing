<script lang="ts">
  import Divider from "$lib/components/Divider.svelte";
  import Link from "$lib/components/Link.svelte";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import Contacts from "$lib/components/blocks/Contacts.svelte";
  import Contributors from "$lib/components/blocks/Contributors.svelte";
  import Donations from "$lib/components/blocks/Donations.svelte";
  import ProjectCard from "$lib/components/blocks/ProjectCard.svelte";
  import { Owners, projects, Status } from "$lib/projects";
  import SvelteSeo from "svelte-seo";

  const friendsProjects = projects.filter((project) => project.owner === Owners.friends);
</script>

<SvelteSeo
  title="О нас"
  description="Мы — сообщество разработчиков, дизайнеров и просто хороших людей, которые делают интернет лучше."
  canonical="https://roll-over.org/about"
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Сообщество разработчиков",
    description:
      "Мы — сообщество разработчиков, дизайнеров и просто хороших людей, которые делают интернет лучше.",
    url: "https://roll-over.org/",
    sameAs: [
      "https://twitter.com/roll_over_group",
      "https://www.linkedin.com/company/roll-over-guild",
      "https://t.me/roll_over_guild",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "mailto:roll.over.projects@gmail.com",
        contactType: "customer support",
      },
    ],
  }}
></SvelteSeo>

<CenteredPage title="О нас">
  <section id="contacts" class="w-full max-w-xl">
    <Contacts></Contacts>
  </section>

  <Divider></Divider>

  <section id="donations" class="w-full max-w-xl">
    <Donations></Donations>
  </section>

  <Divider></Divider>

  <section id="vacancies">
    <Link href="/vacancies">Вакансии</Link>
  </section>

  <Divider></Divider>

  <section id="contributers">
    <Contributors></Contributors>
  </section>

  <Divider></Divider>

  <section class="max-w-2xl">
    <h2>Наши друзья</h2>
    <ul class="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-10">
      {#each friendsProjects as project}
        <ProjectCard {project} />
      {/each}
    </ul>
  </section>
</CenteredPage>
