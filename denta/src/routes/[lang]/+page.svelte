<script>
  import Link from "$lib/components/Link.svelte";
</script>

<svelte:head>
  <title>roll-over - группа открытых проектов</title>
  <meta
    name="description"
    content="Группа открытых проектов: от сервиса поиска работы до открытого микрофона. Мы объединяем наши навыки и творческий потенциал, чтобы
  достигать результатов."
  />
</svelte:head>
<div class="flex flex-col items-center w-full">
  <div class="flex flex-col max-w-xl p-5 sm:p-2 gap-20">
    <h1>roll-over</h1>

    <section>
      <h2>Наши цели</h2>
      <ul class="list-disc pl-10">
        <li>Сделать развитие команды и в команде прозрачным и максимально простым</li>
        <li>Сделать процесс обучения новой профессии простым</li>
      </ul>
    </section>

    <aside>
      <Link href="/projects">Наши проекты</Link>
    </aside>
  </div>
</div>
