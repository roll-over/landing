<script>
  import { projectsLinks } from "$lib/assets/constants.js";
  export { anounce };
  let anounce = {};
</script>

<article class="min-h-60 flex flex-col justify-between bg-slate-800 p-3 rounded-2xl">
  <h3 class="text-2xl font-bold bg-slate-700 py-2 px-4 rounded-xl">
    {anounce.title}
  </h3>
  <p>{anounce.description || ""}</p>
  <p class="py-2 px-4">{anounce.date}</p>

  <a
    class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-xl p-2"
    href={projectsLinks[anounce.project]}>Перейти к проекту к проекту</a
  >
</article>
