<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { article, link };
  let article = {};
  let link = "";
</script>

<section class="border-2 border-gray-800 p-2 sm:p-5 rounded-2xl">
  {#if article.type === "md"}
    <div class="max-h-56 sm:h-36 overflow-hidden article">
      <OnePost source={article.source} />
      <div class="frosted" />
    </div>
    <a
      href={link}
      class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-xl p-2"
      >Читать</a
    >
  {:else if article.type === "youtube"}
    <div class="flex flex-col gap-10">
      <h2 itemprop="name">{article.title}</h2>

      <iframe
        height="315"
        src={article.url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <div class="max-h-56 sm:h-36 overflow-hidden article">
        <OnePost source={article.description} />
        <div class="frosted" />
      </div>
      <a
        href={link}
        class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-xl p-2"
        >Подробнее</a
      >
    </div>
  {/if}
</section>

<style>
  .article {
    position: relative;
  }
  /* The content */
  .frosted::before {
    background-color: black;
    z-index: 2;
    background-size: cover;
  }
  .frosted {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 255));
    background-size: cover;
  }
</style>
