<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack";
  import FiEdit2 from "svelte-icons-pack/fi/FiEdit2";
  import { localisation } from "$lib/localisation/localisation";
  import { page } from "$app/stores";
  let l = localisation($page.params.lang);

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={(e) => {
    dispatch("click", e);
  }}
  class="btn variant-filled-warning flex flex-row items-center justify-center h-14 gap-2"
>
  {l("Редактировать")}
  <Icon src={FiEdit2} />
</button>
