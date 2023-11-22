<script>
  import { vacancies } from "$lib/vacancies.js";
  const itsOpenMicVacancies = vacancies.filter((vacancy) => vacancy.company === "its-open-mic");
</script>

<svelte:head>
  <title>Проект: IT's open mic</title>
  <meta
    name="description"
    content="Открытая онлайн-платформа для проведения выступлений об или около IT."
  />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Проект: IT’s-open-mic</h2>
  <p>Открытая онлайн-платформа для проведения выступлений об или около IT.</p>
  <section>
    <h2>Миссия</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        Создавая и работая над этой площадкой, мы стремимся сделать путь к выступлениям максимально
        простым.
      </li>
    </ul>
  </section>
  <section>
    <h2>Дополнительные сслыки</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="/projects/its-open-mic/anounces">Анонсы</a>
      </li>
      <li>
        <a href="/projects/its-open-mic/past-events">Прошедшие события</a>
      </li>
      <li>
        <a href="/projects/its-open-mic/posts">Статьи</a>
      </li>
    </ul>
  </section>
  <section>
    <h2>Форматы</h2>
    <p>На данный момент есть три формата (митап, брейншторм, подкаст)</p>
    <a href="/projects/its-open-mic/formats">Читать подробнее про форматы</a>
    <p>Мы открыты к новым форматам😉</p>
  </section>
  <section>
    <h2>Кто может выступить?</h2>
    <p>Кто угодно, даже если кажется, что рассказать не о чем, мы поможем подобрать тему.</p>
    <p>Подготовка к выступлениям и митапам: <a href="/projects/its-open-mic/posts">Статьи</a></p>
  </section>
  <section>
    <h2>Где нас искать?</h2>
    <p>
      Не стесняйтесь подключаться к нам в Дискорд: <a href="https://discord.gg/AehGMAwdap">
        https://discord.gg/AehGMAwdap</a
      >
    </p>
  </section>
  <section>
    <h2>Участие</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        Форма подачи заявок на выступление:
        <a href="https://forms.gle/bkodXfTocGPfK3zR8">https://forms.gle/bkodXfTocGPfK3zR8</a>
      </li>
      <li>
        Если есть тема, про которую хотелось бы послушать: <a
          href="https://forms.gle/9Uzs1PVKzFT52JeT9">https://forms.gle/9Uzs1PVKzFT52JeT9</a
        >
      </li>

      {#each itsOpenMicVacancies as vacancies}
        <li>
          <a href={"/vacancies/" + vacancies.id}>Вакансия: {vacancies.title}</a>
        </li>
      {/each}
    </ul>
  </section>
</div>
