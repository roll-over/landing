<script lang="ts">
  import { page } from "$app/stores";
  import SaveButton from "$lib/components/SaveButton.svelte";

  export let data: { availableServices: any[] };

  $: changed = false;
</script>

<div class="flex flex-col items-start p-10 w-full">
  <h1>Подписка</h1>

  <div class="flex flex-col md:flex-row gap-10 w-full">
    <div class="flex flex-col gap-5 w-full">
      <div class="flex flex-row gap-5 w-full">
        <p class="flex-1">Услуга</p>
        <p class="flex-1">Стоимость единицы</p>
        <p class="flex-1">Колличество</p>
        <p class="flex-1">Стоимость</p>
      </div>
      {#each data.availableServices as service}
        <div class="flex flex-row gap-5 w-full">
          <p class="flex-1">{service.title}</p>
          <p class="flex-1">{service.price} руб.</p>
          <input
            bind:value={service.count}
            type="number"
            class="flex-1"
            min={service.freeCount}
            on:input={(e) => {
              const userService = data.availableServices.find((u) => u.id === service.id);
              if (userService) {
                userService.count = Number(e.target.value);
              }
              data.availableServices = [...data.availableServices];
              changed = true;
            }}
          />
          <p class="flex-1">{service.price * (service.count - service.freeCount)} руб.</p>
        </div>
      {/each}
    </div>
  </div>
  {#if changed}
    <p>Изменения не сохранены</p>
    <SaveButton
      on:click={async () => {
        const res = await fetch(`/${$page.params.lang}/crm/${$page.params.companyId}/subscription/api/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.availableServices),
        });
        window.location.reload();
      }}>Сохранить</SaveButton
    >
  {/if}
</div>
