<script lang="ts">
  $: name = null;
</script>

<div class="flex flex-col">
  <h2>Создать команию</h2>
  <input
    type="text"
    placeholder="Название"
    bind:value={name}
    on:input={(e) => {
      name = e.target.value;
    }}
  />

  <button
    on:click={() => {
      console.log(name);

      fetch("/ru/crm/new/company/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
    }}
  >
    Создать
  </button>
</div>
