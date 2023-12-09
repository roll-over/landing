<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import Heading from "$lib/components/markdown/Heading.svelte";

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

<svelte:head>
  <title>
    {$page.params.type === "crm"
      ? "Статьи про crm системы для стоматологий"
      : $page.params.type === "services"
      ? "Статьи про услуги в стоматологиях"
      : "Статьи на denta-crm"}
  </title>
  <meta
    name="description"
    content={$page.params.type === "crm"
      ? "Статьи про crm системы для стоматологий"
      : $page.params.type === "services"
      ? "Статьи про услуги в стоматологиях"
      : "Статьи на denta-crm"}
  />
</svelte:head>

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
      <span>Создано: </span>{new Date(data.article.createdAt).toLocaleString()}
    </p>
    {#if data.article.updatedAt}
      <p class="updated-at">
        <span>Изменено: </span>
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
