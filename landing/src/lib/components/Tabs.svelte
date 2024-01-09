<script>
  export let tabs = [];

  let activeTab = 0;
  let activeTabContent;

  $: {
    if (tabs.length) {
      switchTab(0);
    }
  }

  function switchTab(index) {
    activeTab = index;
    getData(index);
  }

  async function getData(index) {
    const contributors = await fetch(
      `https://api.github.com/repos/roll-over/${tabs[index].name}/contributors`,
    )
      .then((res) => {
        if (res.status === 403) {
          throw new Error("Too many requests");
        }
        return res;
      })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        return [];
      });
    activeTabContent = [...contributors];
    activeTabContent = activeTabContent;
  }
</script>

<div class="tabs flex flex-wrap gap-3">
  {#each tabs as tab, index (tab.id)}
    <button
      class="tab {index === activeTab
        ? 'active'
        : ''} rounded-2xl border-2 border-cyan-900 p-2 text-teal-400 underline-offset-1 hover:border-cyan-800 hover:text-teal-600 hover:underline"
      on:click={() => switchTab(index)}
    >
      {tab.name}
    </button>
  {/each}
</div>

<div class="tab-content">
  {#if tabs[activeTab] && activeTabContent}
    <ul class="flex flex-wrap justify-center gap-3 sm:flex-row">
      {#each activeTabContent as content}
        <li class="flex w-60 flex-col justify-between rounded-2xl bg-slate-800 p-1">
          <a class="flex flex-col" href={content.html_url} target="_blank">
            <h3
              class="space-around flex h-36 flex-col rounded-xl bg-slate-700 px-4 py-2 text-2xl font-bold text-slate-500 hover:bg-slate-600"
            >
              {content.login}
              <img
                src={content.avatar_url}
                alt={`Аватарка ${content.login}'`}
                class="mt-auto w-14 rounded-full"
              />
            </h3>

            <p class="flex justify-end bg-slate-800 p-2 font-bold text-slate-500">
              Участие: {content.contributions}
            </p>
          </a>
          <div></div>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Загрузка:</p>
    <img src="/logo.webp" alt="loader" class="loader h-10 w-14" />
  {/if}
</div>

<style>
  .tab {
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #ccc;
  }

  .active {
    background-color: rgb(13 148 136);
    color: white;
  }

  .loader {
    animation: rotate 1s infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
