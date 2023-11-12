<script>
  import { vacancies } from "$lib/vacancies.js";
  import { page } from "$app/stores";
  const id = $page.params.id;
  const vacancy = vacancies.find((vacancy) => vacancy.id === id);
</script>

<svelte:head>
  <title>Вакансия {vacancy?.title} в roll-over</title>
  <meta
    name="description"
    content="Открытая вакансия {vacancy?.title} в roll-over с описанием: {vacancy?.description}"
  />
</svelte:head>

<div class="flex flex-col gap-5 p-5 sm:pl-0 max-w-2xl justify-left">
  {#if vacancy}
    <h2>Вакансия: {vacancy?.title}</h2>
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
