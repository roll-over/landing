<script lang="ts">
  import { anounces } from "$lib/assets/anounces/anounces";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";

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

  const types = {
    meetup: "митап",
    podcast: "подкаст",
    brainstorm: "брейншторм",
  };

  $: preAnounceForDiscord =
    preAnounceForDiscord ||
    `
@everyone

В этот четверг будет новый ${types[data.anounce.openMicType]} в 14:00 UTC+3

Тема:
"${data.anounce.title}"

Оратор:
${data.anounce.speakerName} 

Место:
На этом сервере в голосовом чате

Приду / Не приду
  `;

  $: preAnounceForTwitter =
    preAnounceForTwitter ||
    `
В этот четверг будет новый ${types[data.anounce.openMicType]} в 14:00 UTC+3

Тема:
"${data.anounce.title}"

Оратор:
${data.anounce.speakerName}

Место:
https://discord.gg/YdEbws3yxC
`;

  $: preAnounceForLinkedIn =
    preAnounceForLinkedIn ||
    `
В этот четверг будет новый ${types[data.anounce.openMicType]} в 14:00 UTC+3

Тема:
"${data.anounce.title}"

Оратор:
${data.anounce.speakerName}

Место:
https://discord.gg/YdEbws3yxC
`;

  $: preAnounceForTelegram =
    preAnounceForTelegram ||
    `
В этот четверг будет новый ${types[data.anounce.openMicType]} в 14:00 UTC+3

Тема:
"${data.anounce.title}"

Оратор:
${data.anounce.speakerName}

Место:
https://discord.gg/YdEbws3yxC
`;

  $: preAnouncesVisible = false;
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

    <button
      on:click={() => {
        preAnouncesVisible = !preAnouncesVisible;
      }}
      class="p-3 rounded-xl bg-gray-700"
    >
      Показать анонсы для соцсетей перед выступлением
    </button>

    <div class={`${preAnouncesVisible ? "flex" : "hidden"} flex-col`}>
      <h1>Анонсы для соцсетей перед выступлением (просто скопируйте текст и вставьте в соцсети)</h1>
      <div class="flex flex-row flex-wrap w-full justify-between">
        <div class="w-60 flex flex-col">
          <h2>
            Для дискорда:
            <button
              class="p-1 rounded-xl bg-gray-700"
              on:click={() => {
                navigator.clipboard.writeText(preAnounceForDiscord);
              }}>Копировать</button
            >
          </h2>
          <textarea
            class="border-2 border-gray-400 rounded-xl px-5 py-2"
            rows="10"
            cols="50"
            bind:value={preAnounceForDiscord}
          ></textarea>
        </div>

        <div class="w-60 flex flex-col">
          <h2>
            Для твиттера:
            <button
              class="p-1 rounded-xl bg-gray-700"
              on:click={() => {
                navigator.clipboard.writeText(preAnounceForTwitter);
              }}>Копировать</button
            >
          </h2>
          <textarea
            class="border-2 border-gray-400 rounded-xl px-5 py-2"
            rows="10"
            cols="50"
            bind:value={preAnounceForTwitter}
          ></textarea>
        </div>

        <div class="w-60 flex flex-col">
          <h2>
            Для LinkedIn:
            <button
              class="p-1 rounded-xl bg-gray-700"
              on:click={() => {
                navigator.clipboard.writeText(preAnounceForLinkedIn);
              }}>Копировать</button
            >
          </h2>
          <textarea
            class="border-2 border-gray-400 rounded-xl px-5 py-2"
            rows="10"
            cols="50"
            bind:value={preAnounceForLinkedIn}
          ></textarea>
        </div>

        <div class="w-60 flex flex-col">
          <h2>
            Для Telegram:
            <button
              class="p-1 rounded-xl bg-gray-700"
              on:click={() => {
                navigator.clipboard.writeText(preAnounceForTelegram);
              }}>Копировать</button
            >
          </h2>
          <textarea
            class="border-2 border-gray-400 rounded-xl px-5 py-2"
            rows="10"
            cols="50"
            bind:value={preAnounceForTelegram}
          ></textarea>
        </div>
      </div>
    </div>
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

  .doc iframe {
    width: 100%;
    height: 100%;
  }

  .doc h1 {
    text-align: center;
  }

  .doc a {
    text-align: center;
    display: block;
    margin-bottom: 20px;
  }
</style>
