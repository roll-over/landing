<script>
  import Link from "$lib/components/Link.svelte";
  import { vacancies } from "$lib/vacancies.js";
  import SvelteSeo from "svelte-seo";

  const hideHireVacancies = vacancies.filter((vacancy) => vacancy.company === "hide-hire");
</script>

<SvelteSeo
  title="Проект: hide-hire"
  description="Проект для анонимного поиска работы - там, где до первого созвона и/или
  внутри переписки, кандидат и работодатель не будут знать друг о друге
  ничего."
  canonical="https://roll-over.org/projects/hide-hire"
/>

<div class="justify-left flex w-full max-w-2xl flex-col gap-10 p-10 sm:pl-3">
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
    <ul class="grid-col grid list-disc gap-2 pl-10">
      <li>Сделать найм честным и прозрачным</li>
      <li>Борьба с дискриминацией</li>
    </ul>
  </section>
  <section>
    <h2>Статьи</h2>
    <Link href="/projects/hide-hire/posts">Все тонкости найма</Link>
  </section>

  <section>
    <h2>Связаться</h2>
    <ul class="grid-col grid list-disc gap-2 pl-10">
      <li>
        <a href="mailto:hide.n.hire@gmail.com">hide.n.hire@gmail.com </a>
      </li>
    </ul>
  </section>
  <section>
    <h2>Участие</h2>
    <ul class="grid-col grid list-disc gap-2 pl-10">
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
