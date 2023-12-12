<script>
  import formats from "$lib/assets/formats.md?raw";
  import OnePost from "$lib/components/markdown/OnePost.svelte";
  import SvelteSeo from "svelte-seo";
</script>

<SvelteSeo
  title="Форматы - IT's open mic"
  description="Форматы - IT's open mic"
  canonical="https://roll-over.org/projects/its-open-mic/formats"
/>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h1>Форматы - IT's open mic</h1>
  <OnePost source={formats} />
</div>
