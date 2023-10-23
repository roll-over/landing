<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { href, title };
  let href = "";
  let title = "";
</script>

<a
  {href}
  class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-2xl p-2"
>
  <slot />
</a>
