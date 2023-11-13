<script>
  import { articles } from "$lib/assets/articles/articles.js";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";

  export let data;

  const article = $page.params.article;

  const a = [...data.entities, ...articles.redFlags.employee.cv.articles].find(
    (_article) => _article.id === article,
  );
</script>

<svelte:head>
  <title>{a?.title}</title>
  <meta name="description" content="Статья: {a?.title}. {a?.source.slice(0, 100)}" />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <Article article={a} />
</div>
