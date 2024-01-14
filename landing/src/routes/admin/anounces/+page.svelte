<script lang="ts">
  import Anounce from "./Anounce.svelte";
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
      return thisWeek + i;
    });
  };

  const getAnounceByDate = (dayOnWeek: number, week: number) => {
    return data.anounces.find((x) => {
      const date = new Date(x.date);
      return date.getUTCDay() === dayOnWeek && getWeekByDate(date) === week;
    });
  };
</script>

<div class="flex flex-col justify-center items-center w-full gap-5">
  <div class="flex flex-wrap gap-2">
    <button
      class="p-2 rounded-2xl bg-green-700 hover:bg-green-900"
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

    <button
      class="p-2 rounded-2xl bg-green-700 hover:bg-green-900"
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
          }),
        });
        window.location.reload();
      }}>Добавить без даты</button
    >
  </div>

  <div class="grid w-full grid-cols-8 gap-1 max-w-lg">
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
          class={`w-full  p-1 ${
            week === thisWeek && dayOnWeek === thisDay + 1 ? "border-blue-200" : "border-black"
          }`}
        >
          {#if getAnounceByDate(dayOnWeek, week)}
            <a
              href={`#anounce-id-${getAnounceByDate(dayOnWeek, week).id}`}
              class={`block text-center rounded-xl ${
                getAnounceByDate(dayOnWeek, week).status === "planing"
                  ? "bg-green-700"
                  : getAnounceByDate(dayOnWeek, week).status === "cancel"
                  ? "bg-yellow-400"
                  : "bg-red-700"
              } w-full p-1 hover:bg-green-500 hover:text-black`}
            >
              {getDateBy(dayOnWeek, week).toLocaleString().split(",")[0].split("/")[1]}
            </a>
          {:else}
            <button
              class="w-full p-1 text-center hover:bg-slate-700"
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
  <div class="flex flex-wrap gap-5">
    <div class="w-[45%] min-w-min">
      <h2>Без даты</h2>
      <div class="flex flex-col gap-5">
        {#each data.anounces.filter((x) => !x.date) as anounce}
          <Anounce {anounce} />
        {/each}
      </div>
    </div>
    <div class="w-[50%]">
      <h2>С датой</h2>
      <div class="flex flex-col gap-5">
        {#each data.anounces.filter((x) => x.date) as anounce}
          <Anounce {anounce} />
        {/each}
      </div>
    </div>
  </div>
</div>
