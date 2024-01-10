<script lang="ts">
  export let showen = true;
</script>

<section class={`${showen ? "flex" : "hidden"} card variant-glass-primary flex-col p-2 md:p-5`}>
  <slot />
</section>

<style>
  section {
    min-width: 50vw;
    width: 100%;
  }
</style>
