<script>
  import Link from "$lib/components/Link.svelte";
  import Mission from "$lib/components/blocks/Mission.svelte";
  import WhatIsProject from "$lib/components/blocks/WhatIsProject.svelte";
  import RollOverSnail from "$lib/assets/roll-over-snail.webp";
</script>

<svelte:head>
  <title>roll-over - группа открытых проектов</title>
  <meta
    name="description"
    content="Группа открытых проектов: от сервиса поиска работы до открытого микрофона. Мы объединяем наши навыки и творческий потенциал, чтобы
  достигать результатов."
  />
</svelte:head>
<div class="flex w-full flex-col items-center">
  <div class="flex max-w-xl flex-col gap-20 p-5 sm:p-2">
    <h1>roll-over</h1>
    <WhatIsProject title="roll-over">
      <p>
        roll-over - это группа энтузиастов, которая собралась вместе, чтобы воплощать свои крутые
        идеи в <a href="/projects">проекты</a>, <a href="/posts">статьи</a> и
        <a href="/projects/its-open-mic"> митапы</a>.
      </p>
      <p>
        Мы объединяем наши разнообразные навыки и творческий потенциал, чтобы достичь впечатляющих
        результатов.
      </p>
      <p>
        Каждый из нас вносит свой вклад в процесс создания, принося свежие идеи и экспертные знания
        в своей области.
      </p>
    </WhatIsProject>
    <img src={RollOverSnail} alt="Большое лого roll-over" class="huge-simbol" />

    <Mission
      >Сделать запуск <a href="/projects"> проектов </a> максимально легким и безболезненным</Mission
    >

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
