<script>
  import { getAppName } from "$lib/app_name";
  import Denta from "./Denta.svelte";
  import Femida from "./Femida.svelte";
</script>

{#if getAppName() === "denta"}
  <Denta />
{:else}
  <Femida />
{/if}
