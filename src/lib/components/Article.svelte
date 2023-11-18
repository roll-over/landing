<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { article };
  let article = {};
</script>

{#if article.type === "md"}
  <article itemscope itemtype="https://schema.org/Article">
    <h1 itemprop="headline">
      {article.title}
    </h1>
    <OnePost source={article.source} />
    <div class="text-right">
      by <span itemprop="author" itemscope itemtype="https://schema.org/Organization">
        <a itemprop="url" href="https://roll-over.org/">
          <span itemprop="name">roll-over</span>
        </a>
      </span>
    </div>
  </article>
{:else if article.type === "youtube"}
  <article
    class="flex flex-col gap-10"
    itemscope
    itemprop="VideoObject"
    itemtype="https://schema.org/VideoObject"
  >
    <h1 itemprop="name">{article.title}</h1>
    <iframe
      height="315"
      src={article.url + "&autoplay=1&loop=1"}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
    <div class="overflow-hidden" itemprop="description">
      <OnePost source={article.description} />
    </div>
  </article>
{/if}
