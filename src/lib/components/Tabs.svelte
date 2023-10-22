<script>
  export let tabs = [];

  let activeTab = 0;
  let activeTabContent;

  $: {
    if(tabs.length) {
      switchTab(0)
    }
  }



  async function switchTab(index) {
    activeTab = index;
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
      {#each activeTabContent as content}
        <p>{content.login}</p>
      {/each}
  {/if}
</div>
