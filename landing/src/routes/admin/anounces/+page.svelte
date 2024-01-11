<script lang="ts">
  import { anounces } from "$lib/assets/anounces/anounces";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";

  export let data: {
    anounces: any[];
  };

  const getNextThursdayDateWith11HoursInUTC = () => {
    const date = new Date();
    date.setUTCHours(11);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    date.setUTCDate(date.getUTCDate() + ((4 - date.getUTCDay() + 7) % 7));

    while (data.anounces.find((x) => x.date === date.toISOString())) {
      date.setUTCDate(date.getUTCDate() + 7);
    }
    return date;
  };

  const getDateBy = (dayOnWeek: number, week: number) => {
    const date = new Date();
    date.setUTCHours(11);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    date.setUTCDate(date.getUTCDate() + ((dayOnWeek - date.getUTCDay() + 7) % 7));
    date.setUTCDate(date.getUTCDate() + (week - getWeekByDate(date)) * 7);

    return date;
  };

  const getWeek = () => {
    const date = new Date();
    const onejan = new Date(date.getFullYear(), 0, 1);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayOfYear = (today - onejan + 86400000) / 86400000;
    return Math.ceil(dayOfYear / 7);
  };

  const getWeekByDate = (date: Date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayOfYear = (today - onejan + 86400000) / 86400000;
    return Math.ceil(dayOfYear / 7);
  };

  $: thisWeek = getWeek();
  $: thisDay = new Date().getUTCDay();

  const getRangeOfWeeksFromThiWeek = () => {
    return new Array(7).fill(0).map((_, i) => {
      console.log(thisWeek + i);
      return thisWeek + i;
    });
  };
  console.log(getRangeOfWeeksFromThiWeek());

  const getAnounceByDate = (dayOnWeek: number, week: number) => {
    return data.anounces.find((x) => {
      const date = new Date(x.date);
      return date.getUTCDay() === dayOnWeek && getWeekByDate(date) === week;
    });
  };
</script>

<CenteredPage>
  <button
    class=""
    on:click={async () => {
      await fetch("/admin/anounces/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          openMicType: "meetup",
          speakerName: "",
          videoUrl: "",
          status: "planing",
          date: getNextThursdayDateWith11HoursInUTC(),
        }),
      });
      window.location.reload();
    }}>Добавить</button
  >

  <div class="grid grid-cols-8 w-full gap-1">
    {#each ["", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as day}
      <div class="text-center">
        {day}
      </div>
    {/each}
    {#each getRangeOfWeeksFromThiWeek() as week}
      <div>
        {week} ({getDateBy(1, week).toLocaleString().split(",")[0].split("/")[0]}):
      </div>
      {#each [1, 2, 3, 4, 5, 6, 7] as dayOnWeek}
        <div
          class={`rounded-xl border-2 p-1 w-full ${
            week === thisWeek && dayOnWeek === thisDay + 1 ? "border-blue-200" : "border-black"
          }`}
        >
          {#if getAnounceByDate(dayOnWeek, week)}
            <a
              href={`#anounce-id-${getAnounceByDate(dayOnWeek, week).id}`}
              class={`block text-center ${
                getAnounceByDate(dayOnWeek, week).status === "planing"
                  ? "bg-green-700"
                  : getAnounceByDate(dayOnWeek, week).status === "cancel"
                  ? "bg-yellow-400"
                  : "bg-red-700"
              } hover:bg-green-500 p-1 w-full`}
            >
              {getDateBy(dayOnWeek, week).toLocaleString().split(",")[0].split("/")[1]}
            </a>
          {:else}
            <button
              class="text-center hover:bg-slate-700 p-1 w-full"
              on:click={async () => {
                await fetch("/admin/anounces/api", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title: "",
                    openMicType: "meetup",
                    speakerName: "",
                    videoUrl: "",
                    status: "planing",
                    date: getDateBy(dayOnWeek, week),
                  }),
                });
                window.location.reload();
              }}
            >
              {getDateBy(dayOnWeek, week).toLocaleString().split(",")[0].split("/")[1]}
            </button>
          {/if}
        </div>
      {/each}
    {/each}
  </div>

  {#each data.anounces as anounce}
    <div class="flex flex-col" id={`anounce-id-${anounce.id}`}>
      <h1 class={anounce.title ? "" : "text-red-500"}>Тема: {anounce.title}</h1>
      <p>
        Дата проведения: {anounce.date
          ? new Date(anounce.date).toLocaleString()
          : "Не указана дата"}
      </p>
      <p class={anounce.openMicType ? "" : "text-red-500"}>
        Тип: {anounce.openMicType}
      </p>
      <p
        class={anounce.status === "planing"
          ? "text-green-500"
          : anounce.status === "cancel"
          ? "text-yellow-400"
          : "text-red-500"}
      >
        Статус: {anounce.status}
      </p>
      <p class={anounce.speakerName ? "" : "text-red-500"}>
        Имя выступащего: {anounce.speakerName}
      </p>
      <p class={anounce.videoUrl ? "" : "text-red-500"}>
        Ссылка на видео:
        <a href={anounce.videoUrl}> {anounce.videoUrl} </a>
      </p>

      <a href={`/admin/anounces/${anounce.id}`} class="rounded-2xl bg-gray-700 p-10"> Подробнее </a>
    </div>
  {/each}
</CenteredPage>
