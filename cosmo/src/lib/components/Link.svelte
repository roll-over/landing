<script>
  export { href };
  let href = "";
</script>

<a
  {href}
  class="flex justify-center rounded-2xl border-2 border-stone-700 bg-sky-400 p-2 text-stone-900 hover:border-stone-600 hover:text-stone-700"
>
  <slot />
</a>
