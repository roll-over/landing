<script>
  import { anounces as _a } from "$lib/assets/anounces/anounces.js";
  import Anounce from "$lib/components/Anounce.svelte";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";

  const anounces = _a.sort((a, b) => b.date - a.date);

  const now = new Date();

  const anouncesAtThisWeek = anounces.filter(
    (anounce) =>
      new Date(anounce.date) >=
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()) &&
      new Date(anounce.date) <
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 7),
  );

  const anouncesAtThisMonth = anounces.filter((anounce) => {
    return (
      new Date(anounce.date) < new Date(now.getFullYear(), now.getMonth() + 1, 1) &&
      new Date(anounce.date) >=
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 7)
    );
  });

  const anouncesLastEvents = anounces.filter((anounce) => new Date(anounce.date) < now);
</script>

<svelte:head>
  <title>Анонсы</title>
  <meta
    name="description"
    content="Анонсы: {anounces
      .slice(0, 5)
      .map((anounce) => anounce?.title)
      .join(', ')}"
  />
</svelte:head>

<CenteredPage title="Анонсы">
  {#if anouncesAtThisWeek.length}
    <div>
      <h2>Анонсы на эту неделю:</h2>
      <div class="flex flex-row flex-wrap gap-5">
        {#each anouncesAtThisWeek as anounce}
          <Anounce {anounce} />
        {/each}
      </div>
    </div>
  {/if}

  {#if anouncesAtThisMonth.length}
    <div>
      <h2>Анонсы в этот месяц:</h2>
      <div class="flex flex-row flex-wrap gap-5">
        {#each anouncesAtThisMonth as anounce}
          <Anounce {anounce} />
        {/each}
      </div>
    </div>
  {/if}

  {#if anouncesLastEvents.length}
    <div>
      <h2>Прошедшие события:</h2>
      <div class="flex flex-row flex-wrap gap-5">
        {#each anouncesLastEvents as anounce}
          <Anounce {anounce} />
        {/each}
      </div>
    </div>
  {/if}
</CenteredPage>
