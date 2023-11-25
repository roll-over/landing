<script lang="ts">
  import { page } from "$app/stores";
  import Section from "$lib/components/Section.svelte";

  import type { PriceListItem, Service } from "$lib/types/crm";
  export let data: { priceList: PriceListItem[]; services: Service[] };
  $: companyId = $page.params.companyId;
  $: addingNewService = false;
  $: newServiceName = "";
  $: newServicePrice = 0;
</script>

<div class="flex flex-col items-start p-10">
  <button
    on:click={async () => {
      addingNewService = true;
    }}
  >
    Добавить услугу
  </button>

  <Section>
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

      <button
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
          const _data = await res.json();
          console.log(_data);
        }}
      >
        Добавить
      </button>
    {/if}
  </Section>
  {#each data.priceList as service}
    {service.name}
    <input
      type="number"
      bind:value={service.price}
      on:input={(e) => {
        service.price = e.target.value;
      }}
    />

    <button
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
        const _data = await res.json();
        console.log(_data);
      }}
      class="bg-teal-500 p-2 rounded-xl"
    >
      Сохранить изменения
    </button>
  {/each}
</div>
