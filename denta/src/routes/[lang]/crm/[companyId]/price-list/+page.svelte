<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";
  import Section from "$lib/components/Section.svelte";

  import type { PriceListItem, Service } from "$lib/types/crm";
  export let data: { priceList: PriceListItem[]; services: Service[] };
  $: companyId = $page.params.companyId;
  $: addingNewService = false;
  $: newServiceName = "";
  $: newServicePrice = 0;
</script>

<div class="flex flex-col items-start p-10">
  <AddButton
    on:click={async () => {
      addingNewService = true;
    }}
  >
    Добавить услугу
  </AddButton>

  {#if addingNewService}
    <input
      type="text"
      bind:value={newServiceName}
      list="services"
      on:input={(e) => {
        newServiceName = e.target.value;
      }}
    />
    <datalist id="services">
      {#each data.services as service}
        <option value={service.name} />
      {/each}
      <option value="new service" />
    </datalist>

    <input
      type="number"
      bind:value={newServicePrice}
      on:input={(e) => {
        newServicePrice = e.target.value;
      }}
    />

    <AddButton
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/price-list/api/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: newServicePrice,
            name: newServiceName,
          }),
        });

        window.location.reload();
      }}
    >
      Добавить
    </AddButton>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
      {#each data.priceList as service}
        <p class="flex flex-col items-center justify-center">
          {service.name}
        </p>
        <input
          type="number"
          bind:value={service.price}
          on:input={(e) => {
            service.price = e.target.value;
          }}
        />

        <SaveButton
          on:click={async () => {
            const res = await fetch(`/ru/crm/${companyId}/price-list/api/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                price: service.price,
                id: service.id,
              }),
            });

            window.location.reload();
          }}
        >
          Сохранить изменения
        </SaveButton>
        <DeleteButton
          on:click={async () => {
            const res = await fetch(`/ru/crm/${companyId}/price-list/api/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: service.id,
              }),
            });

            window.location.reload();
          }}
        >
          Удалить
        </DeleteButton>
      {/each}
    </div>
  {/if}
</div>
