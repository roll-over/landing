<script>
  import { anounces } from "$lib/assets/anounces/anounces.js";
  import Anounce from "$lib/components/Anounce.svelte";

  const a = anounces.filter((anounce) => anounce.project === "its-open-mic");
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  {#each a as anounce}
    <Anounce {anounce} />
  {/each}
</div>
