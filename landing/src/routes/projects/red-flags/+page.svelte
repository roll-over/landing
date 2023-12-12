<script>
  import { articles } from "$lib/assets/articles/articles";
  import { vacancies } from "$lib/vacancies.js";
  import SvelteSeo from "svelte-seo";

  const redFlagsVacancies = vacancies.filter((vacancy) => vacancy.company === "red-flags");
</script>

<SvelteSeo
  title="red-flags - твой консультант при поиске работы"
  description="red-flags - это комплекс сервисов, где вы можете проверить своё резюме на
    наличие ошибок или потенциальную вакансию на наличие красных флагов."
  canonical="https://roll-over.org/projects/red-flags"
/>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h1>Проект: red-flags</h1>
  <p>Твой консультант при поиске работы</p>
  <h2>Миссия</h2>
  <ul>
    <li>Сделать найм честным и прозрачным</li>
  </ul>
  <section>
    <h2>Что такое red-flags?</h2>
    <p>
      red-flags - это комплекс сервисов, где вы можете проверить своё резюме на наличие ошибок или
      потенциальную вакансию.
    </p>
    <p>
      Мы понимаем, что поиск работы - это сложный процесс, включающий в себя множество факторов, и
      поэтому стараемся помочь вам пройти этот процесс легче.
    </p>
  </section>
  <section>
    <h2>Самостоятельная подготовка:</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="https://t.me/red_flags_project">https://t.me/red_flags_project</a>
      </li>
      <li>
        <a href="/projects/red-flags/employee/check-cv/posts">Статьи по проверке резюме</a>
      </li>
    </ul>
  </section>
  <section>
    <h2>Наши сервисы:</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="/projects/red-flags/employee/check-cv"> Проверка резюме </a>
      </li>
      <li>
        <a href="/projects/red-flags/employee/potential-vacancy">Проверка потенциальной вакансии</a>
      </li>
    </ul>
  </section>
  <section>
    <h2>Предостережение</h2>
    <p>
      Мы не гарантируем быстрое и беспроблемное трудоустройство, но стараемся минимизировать
      количество ошибок и проблем, с которыми вы можете столкнуться.
    </p>
  </section>
  <section>
    <h2>А что делать, если что-то идет не так?</h2>

    <p>
      Вы можете написать нам на почту <a href="mailto:red.flags.service@gmail.com"
        >red.flags.service@gmail.com</a
      >
      (Да, мы ее читаем и стараемся ответить как можно скорее)
    </p>
  </section>
  <section>
    <h2>Связаться</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="mailto:red.flags.service@gmail.com">red.flags.service@gmail.com </a>
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
      {#each redFlagsVacancies as vacancies}
        <li>
          <a href={"/vacancies/" + vacancies.id}>Вакансия: {vacancies.title}</a>
        </li>
      {/each}
    </ul>
  </section>
</div>
