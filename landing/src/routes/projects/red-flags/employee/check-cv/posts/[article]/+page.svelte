<script>
  import { articles } from "$lib/assets/articles/articles";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";
  import SvelteSeo from "svelte-seo";

  export let data;

  $: article = $page.params.article;
  $: allArticles = [...data.entities, ...articles.redFlags.employee.cv.articles];
  $: a = allArticles.find((_article) => _article.id === article);
</script>

<SvelteSeo
  title={a?.title}
  description={`Статья: ${a?.title}. ${a?.source.slice(0, 140)}`}
  canonical={`https://roll-over.org/projects/red-flags/employee/check-cv/posts/${article}`}
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Article",
    name: a?.title,
    description: `${a?.source.slice(0, 150)}`,
    url: `https://roll-over.org/projects/red-flags/employee/check-cv/posts/${article}`,
  }}
></SvelteSeo>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <Article
    article={a}
    seeAlso={allArticles
      .filter((_a) => _a.id !== a.id)
      .map((_a) => {
        return {
          title: _a.title,
          url: articles.redFlags.employee.cv.link + "/" + _a.id,
        };
      })}
  />
</div>
