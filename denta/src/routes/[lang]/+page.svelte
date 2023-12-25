<script>
  import { APP_NAME } from "$lib/app_name";
  import Denta from "./Denta.svelte";
  import Femida from "./Femida.svelte";
</script>

{#if APP_NAME === "denta"}
  <Denta />
{:else}
  <Femida />
{/if}
