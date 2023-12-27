<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack";
  import AiOutlineDelete from "svelte-icons-pack/ai/AiOutlineDelete";
  import { localisation } from "$lib/localisation/localisation";
  import { page } from "$app/stores";
  import type { ModalSettings } from "@skeletonlabs/skeleton";
  import { getModalStore } from "@skeletonlabs/skeleton";

  const modalStore = getModalStore();
  let l = localisation($page.params.lang);

  const dispatch = createEventDispatcher();

  const modal: ModalSettings = {
    type: "confirm",
    title: l("Удалить"),
    body: l("Вы уверены что хотите удалить?"),
    response: (r: boolean) => {
      if (r) {
        dispatch("click", r);
      }
    },
  };
</script>

<button
  on:click={(e) => {
    modalStore.trigger(modal);
  }}
  class="btn variant-filled-error flex flex-row items-center justify-center h-14 gap-2"
>
  {l("Удалить")}
  <Icon src={AiOutlineDelete} />
</button>
