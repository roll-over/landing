<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { article, link };
  let article = {};
  let link = "";
  console.log(article);
</script>

<section class="border-2 border-gray-800 p-2 sm:p-5 rounded-2xl">
  {#if article.type === "md"}
    <div class="max-h-56 sm:h-36 overflow-hidden">
      <OnePost source={article.source} />
    </div>
    <a
      href={link}
      class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-xl p-2"
      >Читать</a
    >
  {:else if article.type === "youtube"}
    <div class="flex flex-col gap-10">
      <div class="max-h-56 sm:h-36 overflow-hidden article">
        <OnePost source={article.description} />
        <div class="frosted" />
      </div>
      <a
        href={link}
        class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-xl p-2"
        >Подробнее</a
      >

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
</section>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="blur">
      <feGaussianBlur stdDeviation="5" />
    </filter>
  </defs>
</svg>

<style>
  .article {
    position: relative;
  }
  /* The content */
  .frosted::before {
    filter: url("#blur");
    background-color: black;
    -webkit-filter: blur(8px);
    -moz-filter: blur(8px);
    -ms-filter: blur(8px);
    -o-filter: blur(8px);
    filter: url("#blur");
    z-index: 2;
    background-size: cover;
  }
  .frosted {
    position: absolute;
    bottom: -20px;
    width: 100%;
    height: 40px;
    filter: url("#blur");
    background-color: rgba(0, 0, 0, 0.479);
    background-size: cover;
  }
</style>
