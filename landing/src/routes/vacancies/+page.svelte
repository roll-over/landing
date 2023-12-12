<script>
  import { vacancies } from "$lib/vacancies.js";
  import SvelteSeo from "svelte-seo";
</script>

<SvelteSeo
  title="Вакансии в roll-over"
  description="Открытые позиции для работы в roll-over: дизайнеры, разработчики и маркетологи"
  canonical="https://roll-over.org/vacancies"
/>

<div class="flex flex-col gap-10 p-10 sm:pl-0 max-w-2xl justify-left">
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
<ul class="flex flex-wrap gap-x-5 gap-y-10 max-w-2xl justify-center">
  {#each vacancies as project}
    <li class="w-80 flex flex-col justify-between bg-slate-800 p-1 rounded-2xl">
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold bg-slate-700 py-2 px-4 rounded-xl">
          {project.title}
        </h3>

        <p class="text-slate-500 font-bold bg-slate-800 flex justify-end p-2">
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
        class="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl text-center"
      >
        Подробнее</a
      >
    </li>
  {/each}
</ul>

<div class="flex flex-col p-10 max-w-2xl">
  <p>Даже если вы не нашли подходящую, не стесняйтесь написать нам на почту:</p>
  <a href="mailto:roll.over.projects@gmail.com">roll.over.projects@gmail.com</a>
</div>
