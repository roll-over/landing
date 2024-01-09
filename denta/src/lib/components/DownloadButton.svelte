<script lang="ts">
  import Icon from "svelte-icons-pack";
  import AiOutlineCloudDownload from "svelte-icons-pack/ai/AiOutlineCloudDownload";

  export let src = AiOutlineCloudDownload;
  export let href = "";
</script>

<a
  {href}
  class="variant-filled-primary btn flex h-14 w-min flex-row items-center justify-center gap-2"
  download
>
  <slot />
  <Icon {src} />
</a>
