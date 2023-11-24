<script>
  import { articles } from "$lib/assets/articles/articles";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";

  export let data;

  $: article = $page.params.article;
  $: allArticles = [...data.entities, ...articles.redFlags.employee.cv.articles];
  $: a = allArticles.find((_article) => _article.id === article);
</script>

<svelte:head>
  <title>{a?.title}</title>
  <meta name="description" content="Статья: {a?.title}. {a?.source.slice(0, 100)}" />
</svelte:head>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <Article
    article={a}
    seeAlso={allArticles
      .filter((_a) => _a.id !== a.id)
      .map((_a) => {
        return {
          title: _a.title,
          url: articles.redFlags.employee.cv.link + _a.id,
        };
      })}
  />
</div>
