<script>

  export let tabs = [];
  export let tabsContent = [];
  console.log(tabsContent);

  let activeTab = 0;

  function switchTab(index) {
    activeTab = index;
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
  {#if tabs[activeTab]}
    {#each tabsContent[activeTab] as content}
      <p>{content.login}</p>
    {/each}
  {/if}
</div>
