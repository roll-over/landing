<script>
  export { href, ariaLabel };
  let href = "";
  let ariaLabel = "";
</script>

<a
  {href}
  aria-label={ariaLabel}
  class="text-stone-700 hover:text-stone-500 hover:border-stone-600 p-2 flex justify-center"
>
  <slot />
</a>
