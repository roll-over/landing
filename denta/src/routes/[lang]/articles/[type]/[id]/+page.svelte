<script lang="ts">
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import Heading from "$lib/components/markdown/Heading.svelte";
  import SvelteSeo from "svelte-seo";

  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let data: {
    article: {
      publicId: string;
      title: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      source: string;
      faqs: {
        question: string;
        answer: string;
      }[];
    };
  };
</script>

<SvelteSeo
  title={data.article.title.slice(0, 70)}
  description={data.article.description.slice(0, 150)}
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.article.title,
    name: data.article.title,
    description: data.article.description,
    datePublished: data.article.createdAt,
    dateModified: data.article.updatedAt,
  }}
></SvelteSeo>

<CenteredPage>
  <header class="card-header">
    <h1>{data.article.title}</h1>
  </header>
  <SvelteMarkdown
    source={data.article.source}
    renderers={{
      heading: Heading,
    }}
  />
  <footer class="card-footer">
    <p class="created-at">
      <span>{l("Создано")}: </span>{new Date(data.article.createdAt).toLocaleString()}
    </p>
    {#if data.article.updatedAt}
      <p class="updated-at">
        <span>{l("Изменено")}: </span>
        {new Date(data.article.updatedAt).toLocaleString()}
      </p>
    {/if}
  </footer>
</CenteredPage>

<style>
  .created-at,
  .updated-at {
    font-size: 0.8rem;
    color: rgb(75, 75, 75);
  }
</style>
