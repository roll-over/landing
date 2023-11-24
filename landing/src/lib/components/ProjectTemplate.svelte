<script lang="ts">
  import ProjectTitle from "$lib/components/ProjectTitle.svelte";
  import { projects, type ProjectsTitles } from "$lib/projects";

  export let title: ProjectsTitles | "" = "";

  const project = projects.find((project) => project.title === title);
  if (!project) {
    throw new Error(`Project ${title} not found`);
  }
</script>

<svelte:head>
  <title>{project.title}</title>
  <meta name="description" content={project.description} />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <ProjectTitle title={project.title} panch={project.description} logo={project.logo} />
  <slot />
</div>
