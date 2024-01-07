<script lang="ts">
  import { Status, type Project } from "$lib/projects";
  import Link from "../Link.svelte";

  export { project };
  let project: Project;
</script>

<li
  class={` min-h-60 flex flex-col justify-between bg-slate-800 p-1 rounded-2xl 
    ${project.status === Status.closed ? "opacity-70 w-60" : "w-80"}`}
>
  <div class="flex flex-col">
    <div
      class="flex justify-between items-center text-2xl font-bold bg-slate-700 py-2 px-4 rounded-xl"
    >
      <h3>
        {project.title}
      </h3>
      {#if project.logo}
        <img src={project.logo} alt="logo" class="max-h-14 max-w-14 rounded-xl" />
      {/if}
    </div>
    {#if project.status}
      {#if project.status === Status.comingSoon}
        <p class="text-slate-500 font-bold bg-slate-800 flex justify-end p-2">Уже скоро</p>
      {:else if project.status === Status.releasedFirstVersion}
        <p class="text-violet-600 font-bold bg-slate-800 flex justify-end p-2">
          Доступна первая версия
        </p>
      {:else if project.status === Status.released}
        <p class="text-green-600 font-bold bg-slate-800 flex justify-end p-2">Доступен</p>
      {:else if project.status === Status.closed}
        <p class="text-red-600 font-bold bg-slate-800 flex justify-end p-2">Закрыт</p>
      {:else}
        <p class="font-bold bg-slate-800 flex justify-end p-2">
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
