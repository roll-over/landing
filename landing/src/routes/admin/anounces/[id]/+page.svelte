<script lang="ts">
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
    };
  };

  $: date = date || new Date(data.anounce.date).toISOString().slice(0, 16);
</script>

<CenteredPage>
  <div class="doc flex flex-col gap-20">
    <a href={`/admin/anounces`}>Обратно к анонсам</a>
    <div class="doc flex flex-col gap-5">
      <select
        bind:value={data.anounce.openMicType}
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
      >
        <option value="meetup">meetup</option>
        <option value="podcast">podcast</option>
        <option value="brainstorm">brainstorm</option>
      </select>

      <input
        type="text"
        placeholder="Название"
        bind:value={data.anounce.title}
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
      />

      {#if data.anounce.openMicType === "podcast"}
        <input
          type="text"
          placeholder="Имена спикеров через запятые"
          bind:value={data.anounce.speakerName}
          class="rounded-xl border-2 border-gray-400 px-5 py-2"
        />
      {:else}
        <input
          type="text"
          placeholder="Имя спикера"
          bind:value={data.anounce.speakerName}
          class="rounded-xl border-2 border-gray-400 px-5 py-2"
        />
      {/if}
      <input
        type="text"
        placeholder="Ссылка на видео"
        bind:value={data.anounce.videoUrl}
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
      />
      <p>Время проведения указано по UTC+0:</p>
      <input
        type="datetime-local"
        bind:value={date}
        class="rounded-xl border-2 border-gray-400 px-5 py-2"
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
        class="rounded-xl bg-gray-700 p-3"
      >
        Сохранить
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
