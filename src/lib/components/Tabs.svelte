<script>
  export let tabs = [];

  let activeTab = 0;
  let activeTabContent;

  $: {
    if(tabs.length) {
      switchTab(0)
    }
  }



  function switchTab(index) {
    activeTab = index;
    getData(index)
  }

  async function getData(index) {
    const response = await fetch(`https://api.github.com/repos/roll-over/${tabs[index].name}/contributors`)
    const contributors = await response.json()
    activeTabContent = [...contributors];
    activeTabContent = activeTabContent
  }

</script>

<style>
  .tab {
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #ccc;
  }

  .active {
    background-color: #007bff;
    color: white;
  }
</style>

<div class="tabs">
  {#each tabs as tab, index (tab.id)}
    <button
      class="tab {index === activeTab ? 'active' : ''}"
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
      <a class="flex flex-col" href={content.html_url}>
        <h3 class="flex flex-col space-around h-36 text-2xl font-bold bg-slate-700 text-slate-500 py-2 px-4 rounded-xl">
          {content.login}
          <img src={content.avatar_url} alt={`${content.login}'s avatar'`} class='w-14 mt-auto rounded-full' />
        </h3>

        <p class="text-slate-500 font-bold bg-slate-800 flex justify-end p-2">
          Contributions: {content.contributions}
        </p>
      </a>
      <div>
    </li>
    {/each}
  </ul>
  {:else}
    Loading.render..
  {/if}
</div>
