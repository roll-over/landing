<script>
  import { articles } from "$lib/assets/articles/articles";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";
  export let data;

  const a = [...data.entities];
  const link = articles.simplePsychologist.link;
</script>

<svelte:head>
  <title>Статьи про simple-psychologist</title>
  <meta
    name="description"
    content="Статьи про simple-psychologist. Все тонкости онлайн бота психолога. Статьи: {a
      .slice(0, 5)
      .map((article) => article?.title)
      .join(', ')}}"
  />
</svelte:head>

<div class="justify-left flex w-full max-w-2xl flex-col gap-10 p-10 sm:pl-3">
  <h2>Статьи</h2>
  <div class="flex flex-col gap-10">
    {#each a as article}
      <ArticlePreview {article} link={link + "/" + article.id} />
    {/each}
  </div>
</div>
