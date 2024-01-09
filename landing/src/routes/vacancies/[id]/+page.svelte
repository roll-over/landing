<script>
  import { vacancies } from "$lib/vacancies.js";
  import { page } from "$app/stores";
  import SvelteSeo from "svelte-seo";
  const id = $page.params.id;
  const vacancy = vacancies.find((vacancy) => vacancy.id === id);
</script>

<SvelteSeo
  title="Вакансия {vacancy?.title} в roll-over"
  description="Открытая вакансия {vacancy?.title} в roll-over с описанием: {vacancy?.description}"
  canonical="https://roll-over.org/vacancies/{vacancy?.id}"
/>

<div class="justify-left flex max-w-2xl flex-col gap-5 p-5 sm:pl-0">
  {#if vacancy}
    <h1>Вакансия: {vacancy?.title}</h1>
    <p>
      {vacancy?.company}
    </p>
    <p>
      {vacancy?.description}
    </p>
    <div>
      {#if vacancy.requirments}
        <p class="p-2">Требования:</p>
        <ul class="p-2 pl-10">
          {#each vacancy.requirments as requirment}
            <li class="list-disc">{requirment}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {:else}
    <p>Вакансия не найдена</p>
  {/if}

  <section>
    <h2>Другие вакансии</h2>
    <a href="/vacancies">Вакансии</a>
  </section>
</div>
