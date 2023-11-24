<script>
  const cards = [
    {
      title: "Краткий обзор вакансии",
      price: "5$",
      time: "1-2 дня",
      description: "Получите базовую проверку вакансии на наличие потенциальных проблем.",
      maxPoint: 2,
    },
    {
      title: "Полный обзор",
      price: "9$",
      time: "3-5 дней",
      description:
        "Получите детальный отчет с указанием всех проблемных мест в потенциальной вакансии.",
      maxPoint: 3,
    },
    {
      title: "Краткий бекграунд чек",
      price: "29$",
      time: "5-7 дней",
      description: "Получите сжатую информацию, которую мы аккуратно соберем по всему интернету.",
      maxPoint: 5,
    },
    {
      title: "Комплексный бекграунд чек",
      price: "119$",
      time: "7-10 дней",
      description:
        "Получите комплексную информацию, которую мы аккуратно соберем по всему интернету. (включая открытую информации из налоговой и реальными отзывами работников)",
      maxPoint: 7,
    },
  ];

  const points = [
    "Проверка по списку из 36 красных флагов",
    "Описание до 5 основных проблем в вакансии",
    "Техническая поддержка",
    "Описание всех найденных проблем в вакансии.",
    "Сбор информации по компании в интернете",
    "Персональный чат с консультантом",
    "Проверка налоговых деклараций ",
    "Проверка отзывов работников",
  ];
</script>

<svelte:head>
  <title>Проверка потенциальной вакансии</title>
  <meta
    name="description"
    content="Проверка потенциальной вакансии - это сервис, который позволяет вам
    проверить потенциальную вакансию на наличие красных флагов."
  />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Проверка потенциальной вакансии</h2>
  <p>Твой консультант при поиске вакансии</p>
  <section>
    <h2>Что такое проверка потенциальной вакансии?</h2>
    <p>
      Проверка потенциальной вакансии - это сервис, который позволяет вам проверить потенциальную
      вакансию на наличие красных флагов.
    </p>
  </section>
  <section>
    <h2>Как это работает?</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        Вы заполняете <a href="https://forms.gle/ZKc6UYADyizm8LULA">форму</a> со ссылкой на вакансию
        и контактной информацией.
      </li>
      <li>Мы проводим проверку потенциальной вакансии на наличие красных флагов.</li>
      <li>
        Мы отправляем вам развернутый список со всеми обнаруженными проблемными местами (и
        комментарием от эксперта).
      </li>
    </ul>
  </section>
  <section>
    <h2>Сколько это стоит?</h2>
    <ul class="flex flex-wrap gap-5 justify-around">
      {#each cards as card}
        <li
          class="bg-slate-800 p-4 rounded-2xl w-full min-w-[250px] max-w-[300px] flex flex-col gap-3"
        >
          <h3 class="bg-slate-700 p-3 rounded-xl">{card.title}</h3>
          <div class="flex justify-between p-5">
            <p>{card.price}</p>
            <p>{card.time}</p>
          </div>
          <p>{card.description}</p>
        </li>
      {/each}
    </ul>
  </section>
  <section>
    <h2>Сравнение</h2>
    <ul class="grid gap-5">
      <li class="grid grid-cols-5 gap-5">
        <p />
        {#each cards as card}
          <h3>{card.title}</h3>
        {/each}
      </li>
      {#each points as point, index}
        <li class="grid grid-cols-5 gap-5">
          <p class="flex justify-center">{point}</p>
          {#each cards as card}
            <p class="flex justify-center items-center">
              {#if card.maxPoint >= index}
                ✅
              {:else}
                ❌
              {/if}
            </p>
          {/each}
        </li>
      {/each}
    </ul>
  </section>
  <section>
    <h2>Предостережение</h2>
    <p>
      Мы не гарантируем быстрое и беспроблемное трудоустройство, но стараемся минимизировать
      количество проблем, с которыми вы можете столкнуться.
    </p>
  </section>
  <section>
    <h2>Как записаться?</h2>
    <p>
      Просто заформите небольшую <a href="https://forms.gle/ZKc6UYADyizm8LULA">форму</a>, а
      остальное мы сделаем сами.
    </p>
  </section>
</div>
