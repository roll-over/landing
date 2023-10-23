<script>
  import { articlesStacksList } from "$lib/assets/articles/articles.js";
  import Link from "$lib/components/Link.svelte";
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <h2>Все сборники статей:</h2>
  <ul class="flex flex-col gap-10">
    {#each articlesStacksList as stack}
      <li class="flex flex-col gap-2 border-2 border-stone-900  rounded-xl p-5">
        <h2>{stack.title}</h2>
        <p>{stack.description}</p>
        <Link href={stack.link}>Перейти к списку</Link>
      </li>
    {/each}
  </ul>
</div>
