<script>
  import { vacancies } from "$lib/vacancies.js";
  import SvelteSeo from "svelte-seo";
</script>

<SvelteSeo
  title="Вакансии в roll-over"
  description="Открытые позиции для работы в roll-over: дизайнеры, разработчики и маркетологи"
  canonical="https://roll-over.org/vacancies"
/>

<div class="justify-left flex max-w-2xl flex-col gap-10 p-10 sm:pl-0">
  <h1>Вакансии в roll-over</h1>
  <p>
    Проекты пока не приносят деньги, но мы можем предложить опыт работы в команде и работу над open
    source проектами.
  </p>
  <p>
    У нас нет входных ворот: хочешь попробовать себя в новой сфере или профессии? Просто начни, а мы
    поможем.
  </p>
</div>
<ul class="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-10">
  {#each vacancies as project}
    <li class="flex w-80 flex-col justify-between rounded-2xl bg-slate-800 p-1">
      <div class="flex flex-col">
        <h3 class="rounded-xl bg-slate-700 px-4 py-2 text-2xl font-bold">
          {project.title}
        </h3>

        <p class="flex justify-end bg-slate-800 p-2 font-bold text-slate-500">
          {project.company}
        </p>
      </div>
      <div>
        {#if project.description}
          <p class="p-2">{project.description}</p>
        {/if}
      </div>
      <div>
        {#if project.requirments}
          <p class="p-2">Требования:</p>
          <ul class="p-2 pl-10">
            {#each project.requirments as requirment}
              <li class="list-disc">{requirment}</li>
            {/each}
          </ul>
        {/if}
      </div>
      <a
        href="/vacancies/{project.id}"
        class="rounded-xl bg-blue-800 px-4 py-2 text-center font-bold text-white hover:bg-blue-600"
      >
        Подробнее</a
      >
    </li>
  {/each}
</ul>

<div class="flex max-w-2xl flex-col p-10">
  <p>Даже если вы не нашли подходящую, не стесняйтесь написать нам на почту:</p>
  <a href="mailto:roll.over.projects@gmail.com">roll.over.projects@gmail.com</a>
</div>
