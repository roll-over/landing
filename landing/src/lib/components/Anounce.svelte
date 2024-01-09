<script>
  import { projectsLinks } from "$lib/assets/constants.js";
  export { anounce };
  let anounce = {};
</script>

<article class="min-h-60 flex max-w-xl flex-col justify-between rounded-2xl bg-slate-800 p-3">
  <h3 class="rounded-xl bg-slate-700 px-4 py-2 text-2xl font-bold">
    {anounce.title}
  </h3>
  <p>{anounce.description || ""}</p>
  <p class="px-4 py-2">{new Date(anounce.date).toLocaleString()}</p>

  <a
    class="rounded-xl border-2 border-cyan-900 p-2 text-teal-400 underline-offset-1 hover:border-cyan-800 hover:text-teal-600 hover:underline"
    href={projectsLinks[anounce.project]}>Перейти к проекту</a
  >
</article>
