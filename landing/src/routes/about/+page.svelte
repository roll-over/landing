<script lang="ts">
  import Divider from "$lib/components/Divider.svelte";
  import Link from "$lib/components/Link.svelte";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import Contacts from "$lib/components/blocks/Contacts.svelte";
  import Contributors from "$lib/components/blocks/Contributors.svelte";
  import Donations from "$lib/components/blocks/Donations.svelte";
  import ProjectCard from "$lib/components/blocks/ProjectCard.svelte";
  import { Owners, projects, Status } from "$lib/projects";

  const friendsProjects = projects.filter((project) => project.owner === Owners.friends);
  const historyProjects = projects.filter((project) => project.status === Status.closed);
</script>

<CenteredPage title="О нас">
  <section id="contacts" class="max-w-xl w-full">
    <Contacts></Contacts>
  </section>

  <Divider></Divider>

  <section id="donations" class="max-w-xl w-full">
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

  <section id="old-projects" class="max-w-2xl">
    <h2>Наши старые проекты</h2>
    <ul class="flex flex-wrap gap-x-5 gap-y-10 max-w-2xl justify-center">
      {#each historyProjects as project}
        <ProjectCard {project} />
      {/each}
    </ul>
  </section>

  <Divider></Divider>

  <section class="max-w-2xl">
    <h2>Наши друзья</h2>
    <ul class="flex flex-wrap gap-x-5 gap-y-10 max-w-2xl justify-center">
      {#each friendsProjects as project}
        <ProjectCard {project} />
      {/each}
    </ul>
  </section>
</CenteredPage>
