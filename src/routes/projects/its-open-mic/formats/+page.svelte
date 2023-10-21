<script>
  import formats from "$lib/assets/formats.md?raw";
  import OnePost from "$lib/components/markdown/OnePost.svelte";
</script>

<div class="flex flex-col gap-10 p-10 sm:pl-3 w-full max-w-2xl justify-left">
  <OnePost source={formats} />
</div>
