<script>
  import { vacancies } from "$lib/vacancies.js";
  const hideHireVacancies = vacancies.filter(
    (vacancy) => vacancy.company === "simple-psychologist",
  );
</script>

<svelte:head>
  <title>Проект: simple-psychologist</title>
  <meta name="description" content="Проект ." />
</svelte:head>

<div class="flex flex-col gap-10 p-5 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Проект: simple-psychologist</h2>
  <p>Сервис быстрой психологической помощи</p>
  <section>
    <h2>Что такое simple-psychologist</h2>
    <p>
      Проект simple-psychologist - это сервис, который помогает людям найти эмоциональную поддержку
      в самые тёмные моменты их жизни.
    </p>
    <p>
      Бот эмоциональной поддержки не заменит психолога, но он может помочь поддержать себя в трудную
      минуту.
    </p>
  </section>
  <section>
    <h2>Миссия</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>Нормализовать психологическую поддержку</li>
      <li>Сделать психологическую поддержку доступной</li>
    </ul>
  </section>
  <section>
    <h2>Попробовать</h2>
    <a href="https://t.me/simple_psychologist_bot">https://t.me/simple_psychologist_bot</a>
  </section>
  <section>
    <h2>Связаться</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="mailto:roll.over.projects@gmail.com">roll.over.projects@gmail.com </a>
      </li>
    </ul>
  </section>
  <section>
    <h2>Участие</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="https://github.com/roll-over/tg-bot-psychologist"
          >https://github.com/roll-over/tg-bot-psychologist</a
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
