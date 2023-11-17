<script>
  import { onMount } from "svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  let reposList = [];

  onMount(async () => {
    const response = await fetch("https://api.github.com/orgs/roll-over/repos");
    const fetchedRepos = await response.json();
    const actualRepos = fetchedRepos.filter(
      (repo) => repo.name !== ".github" && repo.name !== "infra",
    );

    reposList = [...actualRepos];
    reposList = reposList;
  });
</script>

<h2>Контрибьюторы</h2>
<p>Люди, вносящие вклад.</p>
<Tabs tabs={reposList} />
