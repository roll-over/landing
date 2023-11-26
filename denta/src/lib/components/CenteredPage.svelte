<script lang="ts">
  export let title = "";
</script>

<div class="flex flex-col w-full items-center p-3">
  <div class="max-w-xl">
    {#if title}
      <h1>{title}</h1>
    {/if}
    <div class="flex flex-col w-full max-w-2xl justify-center gap-20">
      <slot />
    </div>
  </div>
</div>
