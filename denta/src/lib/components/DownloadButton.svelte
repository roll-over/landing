<script lang="ts">
  import Icon from "svelte-icons-pack";
  import AiOutlineCloudDownload from "svelte-icons-pack/ai/AiOutlineCloudDownload";

  export let src = AiOutlineCloudDownload;
  export let href = "";
</script>

<a
  {href}
  class="btn variant-filled-primary flex flex-row items-center justify-center h-14 gap-2 w-min"
  download
>
  <slot />
  <Icon {src} />
</a>
