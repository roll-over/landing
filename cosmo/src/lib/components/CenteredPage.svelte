<script lang="ts">
  export let title = "";
</script>

<div class="flex w-full flex-col items-center p-3">
  <div class="max-w-2xl">
    {#if title}
      <h1>{title}</h1>
    {/if}
    <div class="flex w-full max-w-2xl flex-col justify-center gap-10">
      <slot />
    </div>
  </div>
</div>
