<script>
  import Link from "$lib/components/Link.svelte";
  import { projects, Status } from "$lib/projects";
</script>

<svelte:head>
  <title>Проекты в roll-over</title>
  <meta
    name="description"
    content="Открытые проекты в roll-over: {projects.map((project) => project.title).join(', ')}}"
  />
</svelte:head>

<div class="flex flex-col gap-10 p-5 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Проекты</h2>
  <p>
    Мы всегда стремимся к инновациям и постоянно исследуем новые идеи и подходы. Мы не боимся
    рисковать и выходить за пределы привычного, чтобы найти уникальные и удивительные решения. Наша
    команда работает с энергией и страстью, полностью посвящая себя каждому проекту.
  </p>
  <p>
    Мы не только создаем проекты, которые вдохновляют нашу команду, но и впечатляют окружающих. Мы
    стремимся к тому, чтобы наша работа вызывала эмоции, восхищение и восторг у наших клиентов и
    партнеров. Мы гордимся каждым нашим достижением и продолжаем двигаться вперед, никогда не
    останавливаясь на достигнутом.
  </p>
</div>
<ul class="flex flex-wrap gap-x-5 gap-y-10 max-w-2xl justify-center">
  {#each projects as project}
    <li class="w-80 min-h-60 flex flex-col justify-between bg-slate-800 p-1 rounded-2xl">
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
  {/each}
</ul>
