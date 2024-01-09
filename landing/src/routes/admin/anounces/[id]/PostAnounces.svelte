<script lang="ts">
  export let data: {
    anounce: {
      title: string;
      speakerName: string;
      openMicType: string;
      videoUrl: string;
    };
  };

  const types = {
    meetup: "митап",
    podcast: "подкаст",
    brainstorm: "брейншторм",
  };

  $: preAnounceForDiscord =
    preAnounceForDiscord ||
    `
@everyone

А вот и запись ${types[data.anounce.openMicType]}a на тему "${data.anounce.title}"

${data.anounce.speakerName}, спасибо за выступление!

${data.anounce.videoUrl}
`;

  $: preAnounceForTwitter =
    preAnounceForTwitter ||
    `
A вот и запись ${types[data.anounce.openMicType]}a на тему "${data.anounce.title}"

${data.anounce.speakerName}, спасибо за выступление!

${data.anounce.videoUrl}
    `;

  $: preAnounceForLinkedIn =
    preAnounceForLinkedIn ||
    `
A вот и запись ${types[data.anounce.openMicType]}a на тему "${data.anounce.title}"

${data.anounce.speakerName}, спасибо за выступление!

${data.anounce.videoUrl}
`;

  $: preAnounceForTelegram =
    preAnounceForTelegram ||
    `
A вот и запись ${types[data.anounce.openMicType]}a на тему "${data.anounce.title}"

${data.anounce.speakerName}, спасибо за выступление!

${data.anounce.videoUrl}
`;

  $: preAnouncesVisible = false;
</script>

<button
  on:click={() => {
    preAnouncesVisible = !preAnouncesVisible;
  }}
  class="rounded-xl bg-gray-700 p-3"
>
  Показать постанонсы для соцсетей после выступления
</button>

<div class={`${preAnouncesVisible ? "flex" : "hidden"} flex-col`}>
  <h1>постанонсы для соцсетей (просто скопируйте текст и вставьте в соцсети)</h1>
  <div class="flex w-full flex-row flex-wrap justify-between">
    <div class="flex w-60 flex-col">
      <h2>
        Для дискорда:
        <button
          class="rounded-xl bg-gray-700 p-1"
          on:click={() => {
            navigator.clipboard.writeText(preAnounceForDiscord);
          }}>Копировать</button
        >
      </h2>
      <textarea
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
        rows="10"
        cols="50"
        bind:value={preAnounceForDiscord}
      ></textarea>
    </div>

    <div class="flex w-60 flex-col">
      <h2>
        Для твиттера:
        <button
          class="rounded-xl bg-gray-700 p-1"
          on:click={() => {
            navigator.clipboard.writeText(preAnounceForTwitter);
          }}>Копировать</button
        >
      </h2>
      <textarea
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
        rows="10"
        cols="50"
        bind:value={preAnounceForTwitter}
      ></textarea>
    </div>

    <div class="flex w-60 flex-col">
      <h2>
        Для LinkedIn:
        <button
          class="rounded-xl bg-gray-700 p-1"
          on:click={() => {
            navigator.clipboard.writeText(preAnounceForLinkedIn);
          }}>Копировать</button
        >
      </h2>
      <textarea
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
        rows="10"
        cols="50"
        bind:value={preAnounceForLinkedIn}
      ></textarea>
    </div>

    <div class="flex w-60 flex-col">
      <h2>
        Для Telegram:
        <button
          class="rounded-xl bg-gray-700 p-1"
          on:click={() => {
            navigator.clipboard.writeText(preAnounceForTelegram);
          }}>Копировать</button
        >
      </h2>
      <textarea
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
        rows="10"
        cols="50"
        bind:value={preAnounceForTelegram}
      ></textarea>
    </div>
  </div>
</div>

<style>
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
</style>
