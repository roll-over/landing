<script lang="ts">
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import ProjectCard from "$lib/components/blocks/ProjectCard.svelte";
  import { Owners, projects } from "$lib/projects";
  import SvelteSeo from "svelte-seo";

  const friendsProjects = projects.filter((project) => project.owner === Owners.friends);
</script>

<SvelteSeo
  title="Наши друзья"
  description="Список проектов, которые мы рекомендуем"
  canonical="https://roll-over.org/friends"
></SvelteSeo>

<CenteredPage title="О нас">
  <section class="max-w-2xl">
    <h2>Наши друзья</h2>
    <ul class="flex flex-wrap gap-x-5 gap-y-10 max-w-2xl justify-center">
      {#each friendsProjects as project}
        <ProjectCard {project} />
      {/each}
    </ul>
  </section>
</CenteredPage>
