<script lang="ts">
  import { articles } from "$lib/assets/articles/articles";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";
  import SvelteSeo from "svelte-seo";

  $: article = $page.params.article;
  $: allArticles = articles.itsOpenMic.articles;
  $: a = allArticles.find((_article) => _article.id === article);
  const link = articles.itsOpenMic.link;
</script>

<SvelteSeo
  title={a?.title}
  description="Статья: {a?.title}. {a?.description.slice(0, 100)}"
  canonical={"https://roll-over.org/projects/its-open-mic/past-events/" + a?.id}
/>

<div class="justify-left flex w-full max-w-2xl flex-col gap-10 p-10 sm:pl-3">
  <Article
    article={a}
    seeAlso={allArticles
      .filter((_a) => _a.id !== a.id)
      .map((_a) => {
        return {
          title: _a.title,
          url: link + "/" + _a.id,
        };
      })}
  />
</div>
