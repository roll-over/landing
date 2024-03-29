<script>
  import SvelteSeo from "svelte-seo";
  const cards = [
    {
      title: "Краткий обзор резюме",
      price: "10$",
      time: "1-2 дня",
      description: "Получите базовую проверку своего резюме на наличие ошибок.",
      maxPoint: 2,
    },
    {
      title: "Полный обзор",
      price: "29$",
      time: "3-5 дней",
      description: "Получите детальный отчет с указанием всех проблемных мест в вашем резюме.",
      maxPoint: 4,
    },
    {
      title: "Персональные рекомендации",
      price: "59$",
      time: "5-7 дней",
      description:
        "Получите персональные рекомендации и советы по составлению эффективного резюме.",
      maxPoint: 5,
    },
    {
      title: "Персональный консультант",
      price: "119$",
      time: "7-10 дней",
      description:
        "Получите персональную консультацию по составлению резюме с возможностью задать вопросы онлайн консультанту в рамках индивидуального звонка.",
      maxPoint: 6,
    },
  ];

  const points = [
    "Проверка по списку из 47 красных флагов",
    "Описание до 5 основных проблем в резюме",
    "Техническая поддержка",
    "Описание всех найденных проблем в резюме ",
    "Примеры исправления",
    "Персональный чат с консультантом",
    "Звонок с консультантом",
  ];
</script>

<SvelteSeo
  title="Сервис проверки резюме"
  description="Проверка резюме — это сервис, где вы можете проверить своё резюме на
  наличие ошибок."
  canonical="https://roll-over.org/projects/red-flags/employee/check-cv"
/>

<div class="justify-left flex w-full max-w-2xl flex-col gap-10 p-10 sm:pl-3">
  <h2>Проверка резюме</h2>
  <p>Твой консультант при составлении резюме</p>
  <section>
    <h2>Что такое проверка резюме?</h2>
    <p>Проверка резюме — это сервис, где вы можете проверить своё резюме на наличие ошибок.</p>
    <p>
      Мы понимаем, что резюме является важной частью процесса поиска работы и даже небольшие
      опечатки или несоответствия могут негативно сказаться на ваших шансах на успех.
    </p>
    <p>
      Поэтому мы предлагаем вам воспользоваться нашим сервисом, чтобы исправить ошибки и убедиться,
      что ваше резюме безупречно и готово привлечь внимание работодателей.
    </p>
  </section>
  <section>
    <h2>Как подготовиться самостоятельно?</h2>
    <p>
      Если вы хотите подготовиться самостоятельно, то мы рекомендуем вам ознакомиться с нашими
      статьями:
    </p>
    <a
      href="/projects/red-flags/employee/check-cv/posts"
      class="rounded-2xl border-2 border-cyan-900 p-2 text-teal-400 underline-offset-1 hover:border-cyan-800 hover:text-teal-400 hover:underline"
      >Читать статьи</a
    >
  </section>
  <section>
    <h2>Как это работает?</h2>
    <ul class="grid-col grid list-disc gap-2 pl-10">
      <li>
        Вы заполняете <a href="https://forms.gle/ZKc6UYADyizm8LULA">форму</a> с резюме и контактной информацией.
      </li>
      <li>
        Мы проводим проверку вашего резюме на наличие красных флагов. У нас есть список из 47
        потенциальных проблем, которые могут негативно сказаться на вашем шансе быть приглашенным на
        собеседование.
      </li>
      <li>
        Мы отправляем вам развернутый список со всеми обнаруженными проблемными местами (и
        рекомендациями по их исправлению).
      </li>
      <li>
        После внесения правок вы можете проверить своё резюме повторно, чтобы убедиться, что оно
        идеально и готово привлекать внимание работодателей.
      </li>
    </ul>
  </section>
  <section>
    <h2>Сколько это стоит?</h2>
    <ul class="flex flex-wrap justify-around gap-5">
      {#each cards as card}
        <li
          class="flex w-full min-w-[250px] max-w-[300px] flex-col gap-3 rounded-2xl bg-slate-800 p-4"
        >
          <h3 class="rounded-xl bg-slate-700 p-3">{card.title}</h3>
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
            <p class="flex items-center justify-center">
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
      количество ошибок, с которыми вы можете столкнуться.
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
