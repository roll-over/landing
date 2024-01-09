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
          date: getNextThursdayDateWith11HoursInUTC(),
        }),
      });
      window.location.reload();
    }}>Добавить</button
  >
  {#each data.anounces as anounce}
    <div class="flex flex-col">
      <h1 class={anounce.title ? "" : "text-red-500"}>Тема: {anounce.title}</h1>
      <p>
        Дата проведения: {anounce.date
          ? new Date(anounce.date).toLocaleString()
          : "Не указана дата"}
      </p>
      <p>
        Тип: {anounce.openMicType}
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
