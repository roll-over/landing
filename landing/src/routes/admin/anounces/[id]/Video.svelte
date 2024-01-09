<script lang="ts">
  import { makeTranscribationFromRuToEn } from "$lib/transcribation";

  export let data: {
    anounce: {
      title: string;
      speakerName: string;
      openMicType: string;
    };
  };
  $: countSpeakers = data.anounce.speakerName.split(",").length;

  $: previewLinks =
    data.anounce.openMicType === "podcast"
      ? `/apps/preview-generator?template=${"podcast" + countSpeakers}&title=${
          data.anounce.title
        }&${data.anounce.speakerName
          .split(",")
          .map((x, i) => "name" + (i + 1) + "=" + x.trim())
          .join("&")}`
      : `/apps/preview-generator?name=${data.anounce.speakerName}&template=${"podcast"}&title=${
          data.anounce.title
        }`;

  $: videoTitle = `${data.anounce.title} - ${data.anounce.speakerName} - IT's open mic`;

  $: shortTranscribatedTitle = makeTranscribationFromRuToEn(data.anounce.title);

  $: videoDescription = `
IT's open mic - https://roll-over.org/projects/its-open-mic?utm_source=Youtube&utm_campaign=${shortTranscribatedTitle}
Сервер дискорд для живого участия - https://discord.gg/N36R25pMRa
Анонсы в телеграме - https://t.me/its_open_mic

------------------------

Гильдия открытых проектов - https://roll-over.org/?utm_source=Youtube&utm_campaign=${shortTranscribatedTitle}
Наш X - https://twitter.com/roll_over_group
Наш linkedIn - https://www.linkedin.com/company/roll-over-guild

------------------------

Самореклама:
CRM система для малых стоматологий -  https://denta-crm.com/?utm_source=Youtube&utm_campaign=${shortTranscribatedTitle}

------------------------
  
`;

  $: videoVisible = false;
</script>

<button
  on:click={() => {
    videoVisible = !videoVisible;
  }}
  class="rounded-xl bg-gray-700 p-3"
>
  Показать блок для видео
</button>
<div class={videoVisible ? "block" : "hidden"}>
  <h2>Видео</h2>
  <a href={previewLinks} target="_blank"> Перейти к генератору превьюшек </a>

  <div class="flex flex-col gap-5">
    <h3>Название видео</h3>
    <p>
      {videoTitle}
    </p>
    <button
      on:click={() => {
        navigator.clipboard.writeText(videoTitle);
      }}>Копировать</button
    >
  </div>

  <div class="flex flex-col gap-5">
    <h3>Ссылка на видео</h3>
    <p>
      {data.anounce.videoUrl}
    </p>
    <button
      on:click={() => {
        navigator.clipboard.writeText(data.anounce.videoUrl);
      }}>Копировать</button
    >
  </div>

  <div class="flex flex-col gap-5">
    <h3>Описание</h3>
    <textarea
      rows="10"
      cols="50"
      bind:value={videoDescription}
      class="rounded-xl border-2 border-gray-400 px-5 py-2"
    ></textarea>

    <button
      on:click={() => {
        navigator.clipboard.writeText(videoDescription);
      }}>Копировать</button
    >
  </div>
</div>

<style>
  textarea {
    color: black;
  }
</style>
