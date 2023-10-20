<script>
  import SvelteMarkdown from "svelte-markdown";
  import Heading from "./Heading.svelte";
  import List from "./List.svelte";

  export { source };
  let source = "";
</script>

<div class="flex flex-col gap-3">
  <SvelteMarkdown
    {source}
    renderers={{
      heading: Heading,
      list: List,
    }}
  />
</div>
