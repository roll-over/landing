<script>
  import { articles } from "$lib/assets/articles/articles";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";
  import SvelteSeo from "svelte-seo";

  export let data;

  const a = [...data.entities];
  const link = articles.hideHire.link;
</script>

<SvelteSeo
  title="Статьи про hide-hire"
  description="Статьи про hide-hire. Все тонкости найма и поиска работы. Статьи: {a
    .slice(0, 5)
    .map((article) => article?.title)
    .join(', ')}}"
  canonical="https://roll-over.org/projects/hide-hire/posts"
/>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Статьи</h2>
  <div class="flex flex-col gap-10">
    {#each a as article}
      <ArticlePreview {article} link={link + "/"+ article.id} />
    {/each}
  </div>
</div>
