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
  class="variant-filled-secondary btn flex h-12 flex-row items-center justify-center gap-2"
>
  {l("Редактировать")}
  <Icon src={FiEdit2} />
</button>
