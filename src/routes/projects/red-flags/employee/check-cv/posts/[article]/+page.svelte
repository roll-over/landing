<script>
  import { articles } from "$lib/assets/articles/articles.js";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";

  export let data;

  const article = $page.params.article;

  const a = [...data.entities, ...articles.redFlags.employee.cv.articles].find(
    (_article) => _article.id === article
  );
  const link = articles.redFlags.employee.cv.link;
</script>

<svelte:head>
  <title>{a?.title}</title>
  <meta
    name="description"
    content="Статья: {a?.title}. {a?.source.slice(0, 100)}"
  />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Статья</h2>
  <div class="flex flex-col gap-15">
    <section class="border-2 border-gray-800 p-2 sm:p-10 rounded-lg">
      <Article article={a} />
    </section>
  </div>
</div>
