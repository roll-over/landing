<script>
  import { articles } from "$lib/assets/articles/articles.js";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";
  export let data;

  const a = [...data.entities, ...articles.redFlags.employee.cv.articles];
  const link = articles.redFlags.employee.cv.link;
</script>

<svelte:head>
  <title>Статьи про резюме</title>
  <meta
    name="description"
    content="Статьи про резюме. Проверь своё резюме на наличие ошибок. Статьи: {a
      .slice(0, 5)
      .map((article) => article?.title)
      .join(', ')}}"
  />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Статьи</h2>
  <div class="flex flex-col gap-10">
    {#each a as article}
      <ArticlePreview {article} link={link + article.id} />
    {/each}
  </div>
</div>
