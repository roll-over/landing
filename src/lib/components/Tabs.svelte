<script>
  import Logo from "$lib/assets/logo.webp";
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

<div class="flex flex-wrap gap-3 tabs">
  {#each tabs as tab, index (tab.id)}
    <button
      class="tab {index === activeTab
        ? 'active'
        : ''} text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-2xl p-2"
      on:click={() => switchTab(index)}
    >
      {tab.name}
    </button>
  {/each}
</div>

<div class="tab-content">
  {#if tabs[activeTab] && activeTabContent}
    <ul class="flex justify-center flex-wrap sm:flex-row gap-3">
      {#each activeTabContent as content}
        <li class="w-60 flex flex-col justify-between bg-slate-800 p-1 rounded-2xl">
          <a class="flex flex-col" href={content.html_url} target="_blank">
            <h3
              class="flex flex-col space-around h-36 text-2xl font-bold bg-slate-700 hover:bg-slate-600 text-slate-500 py-2 px-4 rounded-xl"
            >
              {content.login}
              <img
                src={content.avatar_url}
                alt={`${content.login}'s avatar'`}
                class="w-14 mt-auto rounded-full"
              />
            </h3>

            <p class="text-slate-500 font-bold bg-slate-800 flex justify-end p-2">
              Контрибьюторы: {content.contributions}
            </p>
          </a>
          <div></div>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Загрузка:</p>
    <img src="/logo.webp" alt="loader" class="h-10 w-14 loader" />
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
