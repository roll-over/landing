<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";
  import RiSystemMenuAddLine from "svelte-icons-pack/ri/RiSystemMenuAddLine";
  import type { PriceListItem, Service } from "$lib/types/crm";
  import { availableCurrencies } from "$lib/currencies";

  export let data: { priceList: PriceListItem[]; services: Service[]; company: any };
  $: companyId = $page.params.companyId;
  $: addingNewService = false;
  $: newServiceName = "";
  $: newServicePrice = null;
  $: newServiceCurrency = data.company?.currency || "";
</script>

<div class="flex flex-col items-start p-10">
  <AddButton
    on:click={async () => {
      addingNewService = true;
    }}
    src={RiSystemMenuAddLine}
  />

  {#if addingNewService}
    <div class="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Название услуги"
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
      <div class="flex w-full flex-wrap gap-2">
        <input
          type="number"
          placeholder="Цена"
          bind:value={newServicePrice}
          on:input={(e) => {
            newServicePrice = e.target.value;
          }}
        />
        <select bind:value={newServiceCurrency}>
          <option value="">Не выбрано</option>
          {#each availableCurrencies as currency}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
      </div>
    </div>

    <SaveButton
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/price-list/api/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: newServicePrice,
            name: newServiceName,
            currency: newServiceCurrency,
          }),
        });

        window.location.reload();
      }}
    />
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

        <select
          bind:value={service.currency}
          on:change={(e) => {
            service.currency = e.target.value;
          }}
        >
          <option value="">Не выбрано</option>
          {#each availableCurrencies as currency}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
        <div>
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
                  currency: service.currency,
                }),
              });

              window.location.reload();
            }}
          ></SaveButton>
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
          ></DeleteButton>
        </div>
      {/each}
    </div>
  {/if}
</div>
