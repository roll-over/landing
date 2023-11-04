<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { href };
  let href = "";
</script>

<a
  {href}
  class="text-stone-400 hover:text-stone-500 border-2 border-stone-700 hover:border-stone-600 rounded-2xl p-2 flex justify-center"
>
  <slot />
</a>
