<script>
  import { onMount } from "svelte";
  import Tabs from '$lib/components/Tabs.svelte';
  let reposList = [];
  
  onMount(async () => {
    const response = await fetch('https://api.github.com/orgs/roll-over/repos')
    const fetchedRepos = await response.json()
    const actualRepos = fetchedRepos.filter(repo => repo.name !== '.github' && repo.name !== 'infra')

    reposList = [...actualRepos]
    reposList = reposList
  })

</script>


<svelte:head>
  <title>Контрибьюторы</title>
  <meta
    name="description"
    content="Контрибьюторы в проекты roll-over, гильдия открытых проектов"
  />
</svelte:head>


<div class="flex flex-col gap-10 p-10 sm:pl-0 max-w-2xl justify-left">
  <h2>
    Контрибьюторы
  </h2>
  <p>
    Люди, вносящие вклад.
  </p>
  <p>Всем спасибо!</p>
      <Tabs tabs={reposList}/>
</div>