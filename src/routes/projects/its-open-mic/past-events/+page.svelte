<script>
  import { articles } from "$lib/assets/articles/articles.js";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";

  const a = articles.itsOpenMic.articles;
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  {#each a as article}
    <ArticlePreview {article} link={articles.itsOpenMic.link + article.id} />
  {/each}
</div>
