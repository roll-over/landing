<script>
  export { href };
  let href = "";
</script>

<a
  {href}
  class="flex justify-center rounded-xl border-2 border-stone-400 bg-sky-200 p-1 text-stone-900 hover:border-stone-600 hover:text-stone-700"
>
  <slot />
</a>
