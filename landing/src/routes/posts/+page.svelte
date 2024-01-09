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

<div class="justify-left flex w-full flex-col gap-10 p-5 sm:pl-3">
  <h1>Все сборники статей:</h1>
  <ul class="flex flex-row flex-wrap gap-10">
    {#each articlesStacksList as stack}
      <li class="flex w-96 flex-col justify-between gap-2 rounded-xl border-2 border-stone-900 p-5">
        <h2>{stack.title}</h2>
        <p>{stack.description}</p>
        <Link href={stack.link}>Перейти к списку</Link>
      </li>
    {/each}
  </ul>
</div>
