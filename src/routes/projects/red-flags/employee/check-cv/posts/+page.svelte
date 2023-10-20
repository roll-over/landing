<script>
  import { articles } from "$lib/assets/articles/articles.js";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";

  const a = articles.redFlags.employee.cv.articles;
  const link = articles.redFlags.employee.cv.link;
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Статьи</h2>
  <div class="flex flex-col gap-15">
    {#each a as article}
      <ArticlePreview source={article.source} link={link + article.id} />
    {/each}
  </div>
</div>
