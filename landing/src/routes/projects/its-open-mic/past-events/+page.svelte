<script>
  import { articles } from "$lib/assets/articles/articles";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";
  import SvelteSeo from "svelte-seo";

  const a = articles.itsOpenMic.articles;
</script>

<SvelteSeo
  title="Прошедшие события - IT's open mic"
  description="Прошедшие события: {a
    .slice(0, 5)
    .map((article) => article?.title)
    .join(', ')
    .slice(0, 100)}"
  canonical="https://roll-over.org/projects/its-open-mic/past-events"
/>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h1>
    Прошедшие события: {a
      .slice(0, 5)
      .map((article) => article?.title)
      .join(", ")}
  </h1>
  {#each a as article}
    <ArticlePreview {article} link={articles.itsOpenMic.link + "/" + article.id} />
  {/each}
</div>
