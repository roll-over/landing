<script lang="ts">
  export let showen = true;
</script>

<section class={`${showen ? "flex" : "hidden"} flex-col p-2 md:p-5 card variant-glass-primary`}>
  <slot />
</section>

<style>
  section {
    min-width: 50vw;
    width: 100%;
  }
</style>
