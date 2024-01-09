<script>
  import Divider from "$lib/components/Divider.svelte";
  import ProjectCard from "$lib/components/blocks/ProjectCard.svelte";
  import { Owners, projects, Status } from "$lib/projects";
  import SvelteSeo from "svelte-seo";

  const oursOpenProjectsFirstly = projects.filter(
    (project) =>
      project.status !== Status.closed &&
      project.owner === Owners.rollOver &&
      (!project.order || project.order !== 2),
  );
  const oursOpenProjectsSecondly = projects.filter(
    (project) =>
      project.status !== Status.closed && project.owner === Owners.rollOver && project.order === 2,
  );
  const historyProjects = projects.filter(
    (project) => project.status === Status.closed && project.owner === Owners.rollOver,
  );
</script>

<SvelteSeo
  title="Проекты в roll-over"
  description="Открытые проекты в roll-over: {projects.map((project) => project.title).join(', ')}}"
  canonical="https://roll-over.org/projects"
/>

<div class="flex flex-wrap justify-evenly gap-10 p-5 sm:pl-3">
  <div class="justify-left flex w-full max-w-xl flex-col gap-10">
    <h1>Открытые проекты roll-over</h1>

    <Divider></Divider>

    <p>
      Мы всегда стремимся к инновациям и постоянно исследуем новые идеи и подходы. Мы не боимся
      рисковать и выходить за пределы привычного, чтобы найти уникальные и удивительные решения.
      Наша команда работает с энергией и страстью, полностью посвящая себя каждому проекту.
    </p>
    <Divider></Divider>
    <p>
      Мы не только создаем проекты, которые вдохновляют нашу команду, но и впечатляют окружающих. Мы
      стремимся к тому, чтобы наша работа вызывала эмоции, восхищение и восторг у наших клиентов и
      партнеров. Мы гордимся каждым нашим достижением и продолжаем двигаться вперед, никогда не
      останавливаясь на достигнутом.
    </p>
  </div>

  <ul class="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-10">
    {#each oursOpenProjectsFirstly as project}
      <ProjectCard {project} />
    {/each}
  </ul>
  <div class="flex flex-col">
    <section>
      <h2>Наши проекты поменьше</h2>
      <ul class="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-10">
        {#each oursOpenProjectsSecondly as project}
          <ProjectCard {project} />
        {/each}
      </ul>
    </section>

    <section id="old-projects" class="max-w-2xl">
      <h2>Наши старые проекты</h2>
      <ul class="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-10">
        {#each historyProjects as project}
          <ProjectCard {project} />
        {/each}
      </ul>
    </section>
  </div>
</div>
