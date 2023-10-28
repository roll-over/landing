<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { article };
  let article = {};
</script>

{#if article.type === "md"}
  <article>
    <OnePost source={article.source} />
  </article>
{:else if article.type === "youtube"}
  <article class="flex flex-col gap-10">
    <iframe
      height="315"
      src={article.url + "&autoplay=1&loop=1"}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
    <div class="overflow-hidden">
      <OnePost source={article.description} />
    </div>
  </article>
{/if}
