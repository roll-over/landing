<script>
  import { anounces } from "$lib/assets/anounces/anounces.js";
  import Anounce from "$lib/components/Anounce.svelte";
</script>

<svelte:head>
  <title>Анонсы</title>
  <meta
    name="description"
    content="Анонсы: {anounces
      .slice(0, 5)
      .map((anounce) => anounce?.title)
      .join(', ')}"
  />
</svelte:head>

<div class="flex flex-col gap-10 p-5 sm:pl-3 w-full max-w-2xl justify-left">
  {#each anounces as anounce}
    <Anounce {anounce} />
  {/each}
</div>
