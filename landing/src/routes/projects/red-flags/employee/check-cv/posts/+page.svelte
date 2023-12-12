<script>
  import { articles } from "$lib/assets/articles/articles";
  import ArticlePreview from "$lib/components/ArticlePreview.svelte";
  import SvelteSeo from "svelte-seo";
  export let data;

  const a = [...data.entities, ...articles.redFlags.employee.cv.articles];
  const link = articles.redFlags.employee.cv.link;
</script>

<SvelteSeo
  title="Статьи про проверку резюме"
  description="Статьи про проверку резюме. Проверь своё резюме на наличие ошибок. Статьи: {a
    .slice(0, 5)
    .map((article) => article?.title)
    .join(', ')}}"
  canonical="https://roll-over.org/projects/red-flags/employee/check-cv/posts"
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Статьи про проверку резюме",
    description: `Статьи про проверку резюме. Проверь своё резюме на наличие ошибок. Статьи: ${a
      .slice(0, 5)
      .map((article) => article?.title)
      .join(", ")}}`,
    url: "https://roll-over.org/projects/red-flags/employee/check-cv/posts",
  }}
></SvelteSeo>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Статьи</h2>
  <div class="flex flex-col gap-10">
    {#each a as article}
      <ArticlePreview {article} link={link + article.id} />
    {/each}
  </div>
</div>
