<script>
  import { articlesStacksList } from "$lib/assets/articles/articles";
  import Link from "$lib/components/Link.svelte";
  import SvelteSeo from "svelte-seo";
</script>

<SvelteSeo
  title="Все сборники статей"
  description="Все сборники статей: {articlesStacksList
    .slice(0, 5)
    .map((stack) => stack?.title)
    .join(', ')}}"
  canonical="https://roll-over.org/posts"
/>

<div class="flex flex-col gap-10 p-5 sm:pl-3 w-full justify-left">
  <h1>Все сборники статей:</h1>
  <ul class="flex flex-row flex-wrap gap-10">
    {#each articlesStacksList as stack}
      <li class="flex flex-col w-96 gap-2 border-2 border-stone-900 rounded-xl p-5 justify-between">
        <h2>{stack.title}</h2>
        <p>{stack.description}</p>
        <Link href={stack.link}>Перейти к списку</Link>
      </li>
    {/each}
  </ul>
</div>
