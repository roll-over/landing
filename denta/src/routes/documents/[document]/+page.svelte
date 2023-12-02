<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { documents } from "$lib/assets/documents";

  $: if (!documents.map((x) => x.id).includes($page.params.document)) {
    goto("/documents");
  }
</script>

<a href={"/documents"}>Back to documents</a>
<h1>{documents.find((item) => item.id === $page.params.document)?.label}</h1>
<iframe
  title="cookie policy"
  width="100%"
  height="100%"
  class="min-h-screen"
  src={documents.find((item) => item.id === $page.params.document).document}
></iframe>
