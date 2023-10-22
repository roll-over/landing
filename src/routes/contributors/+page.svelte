<script>
  import { onMount } from "svelte";
  import Tabs from '$lib/components/Tabs.svelte';
  let reposList = [];
  let contributorsTabsContent = []
  
  onMount(async () => {
    const response = await fetch('https://api.github.com/orgs/roll-over/repos')
    const fetchedRepos = await response.json()
    const actualRepos = fetchedRepos.filter(repo => repo.name !== '.github' && repo.name !== 'infra')

    reposList = [...actualRepos]
    reposList = reposList

    await (() => {
      reposList.forEach(async tab => {
        const response = await fetch(`https://api.github.com/repos/roll-over/${tab.name}/contributors`)
        const contributors = await response.json()
        contributorsTabsContent.push(contributors);
        contributorsTabsContent = contributorsTabsContent
        console.log(contributorsTabsContent);
    })
    })()
  })
  

</script>

<div class="flex flex-col gap-10 p-10 sm:pl-0 max-w-2xl justify-left">
  <h2>
    Контрибьюторы
  </h2>
  <p>
    Люди, вносящие вклад.
  </p>
  <p>Всем спасибо!</p>
  <Tabs tabs={reposList} tabsContent={contributorsTabsContent}/>
</div>