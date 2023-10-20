<script>
  import OnePost from "./markdown/OnePost.svelte";

  export { source, link };
  let source = "";
  let link = "";
</script>

<section class="border-2 border-gray-800 p-10 rounded-lg">
  <div class="h-56 sm:h-36  overflow-hidden">
    <OnePost {source} />
  </div>
  <a
    href={link}
    class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-2xl p-2"
    >Читать</a
  >
</section>
