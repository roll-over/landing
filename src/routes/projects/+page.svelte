<script>
  const Status = {
    comingSoon: "coming-soon",
    releasedFirstVersion: "releasedFirstVersion",
  };
  const projects = [
    {
      href: "/projects/red-flags",
      title: "red-flags",
      status: Status.releasedFirstVersion,
      description: "Твой консультант при поиске работы",
    },
    {
      href: "https://www.notion.so/hide-hire-coming-soon-d3b4178cc7474595aa28c583c3322b7c?pvs=21",
      title: "hide-hire",
      description: "Сервис поиска работы и кандидатов",
      status: Status.comingSoon,
    },
    {
      href: "https://www.notion.so/IT-s-open-mic-coming-soon-67bdf02f766741d4ade58754e5a72a7b?pvs=21",
      title: "IT’s-open-mic",
      description:
        "Открытая онлайн-платформа для проведения выступлений об или около IT.",
      status: Status.releasedFirstVersion,
    },
    {
      href: "https://www.notion.so/HRBRO-43bdc175552446aca06d254a867b11b9?pvs=21",
      title: "HRBRO",
      status: Status.releasedFirstVersion,
      description: "Школа поисков работы",
    },
    {
      href: "https://www.notion.so/c013d9003b6f408e993c14e4317a7f40?pvs=21",
      title: "Гайды",
      status: Status.releasedFirstVersion,
      description: "Подробное описание хаотичных процессов",
    },
  ];
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Проекты</h2>
  <p>
    Мы всегда стремимся к инновациям и постоянно исследуем новые идеи и подходы.
    Мы не боимся рисковать и выходить за пределы привычного, чтобы найти
    уникальные и удивительные решения. Наша команда работает с энергией и
    страстью, полностью посвящая себя каждому проекту.
  </p>
  <p>
    Мы не только создаем проекты, которые вдохновляют нашу команду, но и
    впечатляют окружающих. Мы стремимся к тому, чтобы наша работа вызывала
    эмоции, восхищение и восторг у наших клиентов и партнеров. Мы гордимся
    каждым нашим достижением и продолжаем двигаться вперед, никогда не
    останавливаясь на достигнутом.
  </p>
</div>
<ul class="flex flex-wrap gap-x-5 gap-y-10 max-w-2xl justify-center">
  {#each projects as project}
    <li
      class="w-80 h-60 flex flex-col justify-between bg-slate-800 p-1 rounded-2xl"
    >
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold bg-slate-700 py-2 px-4 rounded-xl">
          {project.title}
        </h3>
        {#if project.status}
          {#if project.status === Status.comingSoon}
            <p
              class="text-slate-500 font-bold bg-slate-800 flex justify-end p-2"
            >
              Уже скоро
            </p>
          {:else if project.status === Status.releasedFirstVersion}
            <p
              class="text-violet-600 font-bold bg-slate-800 flex justify-end p-2"
            >
              Доступна первая версия
            </p>
          {:else}
            <p class="font-bold bg-slate-800 flex justify-end p-2">
              {project.status}
            </p>
          {/if}
        {/if}
      </div>
      <div>
        {#if project.description}
          <p class="p-2">{project.description}</p>
        {/if}
      </div>
      <a
        href={project.href}
        class="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl text-center"
      >
        Перейти
      </a>
    </li>
  {/each}
</ul>
