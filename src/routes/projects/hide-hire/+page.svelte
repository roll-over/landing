<script>
  import { vacancies } from "$lib/vacancies.js";
  const hideHireVacancies = vacancies.filter((vacancy) => vacancy.company === "hide-hire");
</script>

<svelte:head>
  <title>Проект: hide-hire</title>
  <meta
    name="description"
    content="Проект для анонимного поиска работы - там, где до первого созвона и/или
    внутри переписки, кандидат и работодатель не будут знать друг о друге
    ничего, кроме того, что указано в cv и базовых вопросов про опыт, стек,
    грейд, зарплатной вилке и другой недеанонимизирующей информации."
  />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Проект: hide-hire</h2>
  <p>Сервис поиска работы и кандидатов</p>
  <section>
    <h2>Что такое hide-hire</h2>
    <p>
      Проект для анонимного поиска работы - там, где до первого созвона и/или внутри переписки,
      кандидат и работодатель не будут знать друг о друге ничего, кроме того, что указано в cv и
      базовых вопросов про опыт, стек, грейд, зарплатной вилке и другой недеанонимизирующей
      информации.
    </p>
  </section>
  <section>
    <h2>Миссия</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>Сделать найм честным и прозрачным</li>
      <li>Борьба с дискриминацией</li>
    </ul>
  </section>
  <section>
    <h2>Связаться</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="mailto:hide.n.hire@gmail.com">hide.n.hire@gmail.com </a>
      </li>
    </ul>
  </section>
  <section>
    <h2>Участие</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="https://github.com/roll-over/unknown-interview"
          >https://github.com/roll-over/unknown-interview</a
        >
      </li>
      {#each hideHireVacancies as vacancies}
        <li>
          <a href={"/vacancies/" + vacancies.id}>Вакансия: {vacancies.title}</a>
        </li>
      {/each}
    </ul>
  </section>
</div>
