<script lang="ts">
  import { Status, type Project } from "$lib/projects";
  import Link from "../Link.svelte";

  export { project };
  let project: Project;
</script>

<li
  class={` min-h-60 flex flex-col justify-between rounded-2xl bg-slate-800 p-1 
    ${project.status === Status.closed ? "w-60 opacity-70" : "w-80"}`}
>
  <div class="flex flex-col">
    <div
      class="flex items-center justify-between rounded-xl bg-slate-700 px-4 py-2 text-2xl font-bold"
    >
      <h3>
        {project.title}
      </h3>
      {#if project.logo}
        <img src={project.logo} alt="logo" class="max-w-14 max-h-14 rounded-xl" />
      {/if}
    </div>
    {#if project.status}
      {#if project.status === Status.comingSoon}
        <p class="flex justify-end bg-slate-800 p-2 font-bold text-slate-500">Уже скоро</p>
      {:else if project.status === Status.releasedFirstVersion}
        <p class="flex justify-end bg-slate-800 p-2 font-bold text-violet-600">
          Доступна первая версия
        </p>
      {:else if project.status === Status.released}
        <p class="flex justify-end bg-slate-800 p-2 font-bold text-green-600">Доступен</p>
      {:else if project.status === Status.closed}
        <p class="flex justify-end bg-slate-800 p-2 font-bold text-red-600">Закрыт</p>
      {:else}
        <p class="flex justify-end bg-slate-800 p-2 font-bold">
          {project.status}
        </p>
      {/if}
    {/if}
  </div>
  <div>
    {#if project.description}
      <p class="p-2">{project.description}</p>
    {/if}
  </div>
  <Link href={project.href}>Перейти</Link>
</li>
