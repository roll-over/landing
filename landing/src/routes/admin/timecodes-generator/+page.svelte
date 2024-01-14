<script lang="ts">
  $: videoId = videoId;
  $: lang = lang;

  $: result = null as {
    timecodes: string[];
    srt: string;
  } | null;
</script>

<div class="flex w-full items-center justify-center">
  <div class="flex flex-col gap-5">
    <input type="text" bind:value={videoId} placeholder="Video Id" />
    <select bind:value={lang}>
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>

    <button
      on:click={async () => {
        const res = await fetch(`/apps/timecodes-generator/${lang}/${videoId}`);
        const data = await res.json();
        result = data;
      }}
    >
      Generation
    </button>

    {#if result}
      <div>
        <h2>Timecodes</h2>
        <button
          on:click={() => {
            navigator.clipboard.writeText(result.timecodes.join("\n"));
          }}
        >
          Copy
        </button>
        <div style="white-space: pre-line">
          {result.timecodes.join("\n")}
        </div>
      </div>
      <div>
        <h2>Text</h2>
        <button
          on:click={() => {
            navigator.clipboard.writeText(result.text);
          }}
        >
          Copy
        </button>
        <div style="white-space: pre-line">
          {result.srt}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  input,
  select {
    color: black;
    width: 100%;
  }
</style>
