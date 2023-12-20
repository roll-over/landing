<script lang="ts">
  import { anounces } from "$lib/assets/anounces/anounces";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import PreAnounces from "./PreAnounces.svelte";

  export let data: {
    anounce: {
      title: string;
      speakerName: string;
      videoUrl: string;
      date: string;
      openMicType: string;
    };
  };

  $: date = date || new Date(data.anounce.date).toISOString().slice(0, 16);
</script>

<CenteredPage class="flex flex-col justify-center items-center">
  <div class="doc flex flex-col gap-5">
    <a href={`/admin/anounces`}>Обратно к анонсам</a>
    <input
      type="text"
      placeholder="Название"
      bind:value={data.anounce.title}
      class="border-2 border-gray-400 rounded-xl px-5 py-2"
    />
    <input
      type="text"
      placeholder="Имя спикера"
      bind:value={data.anounce.speakerName}
      class="border-2 border-gray-400 rounded-xl px-5 py-2"
    />
    <input
      type="text"
      placeholder="Ссылка на видео"
      bind:value={data.anounce.videoUrl}
      class="border-2 border-gray-400 rounded-xl px-5 py-2"
    />
    <select
      bind:value={data.anounce.openMicType}
      class="border-2 border-gray-400 rounded-xl px-5 py-2"
    >
      <option value="meetup">meetup</option>
      <option value="podcast">podcast</option>
      <option value="brainstorm">brainstorm</option>
    </select>
    <p>Время проведения указано по UTC+0:</p>
    <input
      type="datetime-local"
      bind:value={date}
      class="border-2 border-gray-400 rounded-xl px-5 py-2"
      on:change={() => {
        console.log(date);
      }}
    />

    <button
      on:click={async () => {
        console.log(date);

        await fetch(`/admin/anounces/api`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data.anounce,
            date: date + ":00.000Z",
          }),
        }).then((res) => {
          window.location.reload();
        });
      }}
      class="p-3 rounded-xl bg-gray-700"
    >
      Сохранить
    </button>

    <PreAnounces data={{ anounce: data.anounce }} />
  </div></CenteredPage
>

<style>
  input,
  select,
  textarea {
    color: black;
    font-size: medium;
  }
  .doc {
    width: 100%;
    max-width: 700px;
    height: 100%;
    min-height: 100vh;
  }


  .doc a {
    text-align: center;
    display: block;
    margin-bottom: 20px;
  }
</style>
