<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Heading from "$lib/components/markdown/Heading.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import SvelteSeo from "svelte-seo";

  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);
  export let data: {
    articles: {
      publicId: string;
      title: string;
      description: string;
      createdAt: string;
    }[];
  };
</script>

<SvelteSeo
  title={$page.params.type === "crm"
    ? l("Статьи про crm системы для стоматологий")
    : $page.params.type === "services"
    ? l("Статьи про услуги в стоматологиях")
    : l("Статьи на denta-crm")}
  description={$page.params.type === "crm"
    ? l("Статьи про crm системы для стоматологий")
    : $page.params.type === "services"
    ? l("Статьи про услуги в стоматологиях")
    : l("Статьи на denta-crm")}
  canonical={`https://denta-crm.com/${$page.params.lang}/articles/${$page.params.type}`}
></SvelteSeo>

<CenteredPage>
  <h1>
    {$page.params.type === "crm"
      ? l("Статьи про crm системы для стоматологий")
      : $page.params.type === "services"
      ? l("Статьи про услуги в стоматологиях")
      : l("Статьи на denta-crm")}
  </h1>
  {#each data.articles as article}
    <a
      class="card p-4 variant-filled-primary"
      href={`/${$page.params.lang}/articles/${$page.params.type}/${article.publicId}`}
    >
      <header class="card-header">
        <h2>{article.title}</h2>
      </header>
      <div class="p-4 article-preview">
        <SvelteMarkdown
          source={article.description}
          renderers={{
            heading: Heading,
          }}
        />
      </div>
      <footer class="card-footer">
        <p class="created-at">{new Date(article.createdAt).toLocaleString()}</p>
      </footer>
    </a>
  {/each}
</CenteredPage>

<style>
  .created-at {
    font-size: 0.8rem;
    color: rgb(75, 75, 75);
  }

  .article-preview {
    max-height: 200px;
    overflow: hidden;
    text-wrap: ellipsis;
  }
</style>
