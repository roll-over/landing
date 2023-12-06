<script lang="ts">
  export { y };
  let y = true;
</script>

<div class="min-w-[{y ? '100%' : '1px'}] min-h-[{!y ? '100%' : '1px'}] border-green-300 border-2 rounded-xl"></div>
