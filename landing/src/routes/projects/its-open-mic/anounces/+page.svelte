<script>
  import { anounces } from "$lib/assets/anounces/anounces.js";
  import Anounce from "$lib/components/Anounce.svelte";
  import SvelteSeo from "svelte-seo";

  const a = anounces.filter((anounce) => anounce.project === "its-open-mic");
</script>

<SvelteSeo
  title="Анонсы - IT's open mic"
  description="Анонсы открытого микрофона: {a
    .slice(0, 5)
    .map((article) => article?.title)
    .join(', ')
    .slice(0, 100)}"
  canonical="https://roll-over.org/projects/its-open-mic/anounces"
/>

<div class="justify-left flex w-full max-w-2xl flex-col gap-10 p-10 sm:pl-3">
  <h1>
    Анонсы: {a
      .slice(0, 5)
      .map((article) => article?.title)
      .join(", ")}
  </h1>
  {#each a as anounce}
    <Anounce {anounce} />
  {/each}
</div>
