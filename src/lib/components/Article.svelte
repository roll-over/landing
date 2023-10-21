<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { article };
  let article = {};
</script>

{#if article.type === "md"}
  <OnePost source={article.source} />
{:else if article.type === "youtube"}
  <div class="flex flex-col gap-10">
    <div class="overflow-hidden">
      <OnePost source={article.description} />
    </div>

    <iframe
      height="315"
      src={article.url}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
{/if}
