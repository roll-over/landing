<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import PostAnounces from "./PostAnounces.svelte";
  import PreAnounces from "./PreAnounces.svelte";
  import Video from "./Video.svelte";

  export let data: {
    anounce: {
      title: string;
      speakerName: string;
      videoUrl: string;
      date: string;
      openMicType: string;
      status: "cancel" | "planing" | "";
      id: string;
    };
  };

  $: date =
    date || data.anounce.date ? new Date(data.anounce.date).toISOString().slice(0, 16) : null;
</script>

<CenteredPage>
  <div class="doc flex flex-col gap-20">
    <a href={`/admin/anounces`}>Обратно к анонсам</a>
    <div class="doc flex flex-col gap-5">
      <div>
        <label for="openMicType">Тип:</label>
        <select
          id="openMicType"
          bind:value={data.anounce.openMicType}
          class="rounded-xl border-2 border-gray-400 px-5 py-2"
        >
          <option value="meetup">Митап</option>
          <option value="podcast">Подкаст</option>
          <option value="brainstorm">Брейншторм</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div>
        <label for="status">Статус:</label>
        <select
          id="status"
          bind:value={data.anounce.status}
          class="rounded-xl border-2 border-gray-400 px-5 py-2"
        >
          <option value="cancel">Отменен</option>
          <option value="planing">Планируется</option>
          <option value="pending-ghost">Ожидается ответ гостя</option>
          <option value="past">Прошел</option>
        </select>
      </div>

      <div>
        <label for="title">Название:</label>
        <input
          type="text"
          id="title"
          placeholder="Название"
          bind:value={data.anounce.title}
          class="rounded-xl border-2 border-gray-400 px-5 py-2"
        />
      </div>
      <div>
        {#if data.anounce.openMicType === "podcast" || data.anounce.openMicType === "other"}
          <label for="speakersName"> Имена спикеров через запятые: </label>
          <input
            type="text"
            id="speakersName"
            placeholder="Имена спикеров через запятые"
            bind:value={data.anounce.speakerName}
            class="rounded-xl border-2 border-gray-400 px-5 py-2"
          />
        {:else}
          <label for="speakerName">Имя спикера:</label>
          <input
            type="text"
            id="speakerName"
            placeholder="Имя спикера"
            bind:value={data.anounce.speakerName}
            class="rounded-xl border-2 border-gray-400 px-5 py-2"
          />
        {/if}
      </div>

      <div>
        <label for="videoUrl">Ссылка на видео:</label>
        <input
          type="text"
          id="videoUrl"
          placeholder="Ссылка на видео"
          bind:value={data.anounce.videoUrl}
          class={`rounded-xl border-2 border-gray-400 px-5 py-2 ` +
            (data.anounce.videoUrl ? "" : "bg-red-200")}
        />
      </div>
      <div>
        <label for="date">Время проведения указано по UTC+0:</label>
        <input
          type="datetime-local"
          id="date"
          bind:value={date}
          class="rounded-xl border-2 border-gray-400 px-5 py-2"
        />
      </div>

      <button
        on:click={async () => {
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
            invalidateAll();
          });
        }}
        class="rounded-xl bg-gray-700 p-3"
      >
        Сохранить
      </button>

      <button
        on:click={async () => {
          await fetch(`/admin/anounces/api`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.anounce.id,
            }),
          }).then((res) => {
            invalidateAll();
          });
        }}
        class="rounded-xl bg-red-700 p-3"
      >
        Удалить
      </button>
    </div>
    <div>
      <PreAnounces data={{ anounce: data.anounce }} />
    </div>
    <Video data={{ anounce: data.anounce }} />
    <div>
      <PostAnounces data={{ anounce: data.anounce }} />
    </div>
  </div>
</CenteredPage>

<style>
  input,
  select {
    color: black;
    font-size: medium;
  }

  .doc a {
    text-align: center;
    display: block;
    margin-bottom: 20px;
  }
</style>
