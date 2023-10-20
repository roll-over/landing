<script>
  import { articles } from "$lib/assets/articles/articles.js";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";
  const article = $page.params.article;

  const a = articles.redFlags.employee.cv.articles.find(
    (_article) => _article.id === article
  );
  const link = articles.redFlags.employee.cv.link;
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Статьи</h2>
  <div class="flex flex-col gap-15">
    <section class="border-2 border-gray-800 p-10 rounded-lg">
      <div class="p-10">
        <Article source={a.source} />
      </div>
    </section>
  </div>
</div>
