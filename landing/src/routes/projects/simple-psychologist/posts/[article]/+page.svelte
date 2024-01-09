<script>
  import { page } from "$app/stores";
  import { articles } from "$lib/assets/articles/articles";
  import Article from "$lib/components/Article.svelte";
  import SvelteSeo from "svelte-seo";

  export let data;

  $: article = $page.params.article;
  $: allArticles = [...data.entities];
  $: a = allArticles.find((_article) => _article.id === article);
</script>

<SvelteSeo
  title={a?.title}
  description="Статья: {a?.title}. {a?.source.slice(0, 100)}"
  canonical="https://roll-over.org/projects/simple-psychologist/posts/{a?.id}"
/>

<div class="justify-left flex w-full max-w-2xl flex-col gap-10 p-10 sm:pl-3">
  <Article
    article={a}
    seeAlso={allArticles
      .filter((_a) => _a.id !== a.id)
      .map((_a) => {
        return {
          title: _a.title,
          url: articles.simplePsychologist.link + "/" + _a.id,
        };
      })}
  />
</div>
