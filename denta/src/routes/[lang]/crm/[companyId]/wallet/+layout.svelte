<script lang="ts">
  import { page } from "$app/stores";
  import { clickOutside } from "$lib/clickOutside";
  import NavList from "$lib/components/NavList.svelte";
  import type { Company } from "$lib/types/crm";

  export let data: {
    company: Company;
  };

  const links = [
    {
      title: "Кошелек",
      href: `/ru/crm/${data.company.id}/wallet`,
    },
    {
      title: "Подписка",
      href: `/ru/crm/${data.company.id}/wallet/subscription`,
    },
    {
      title: "Транзакции",
      href: `/ru/crm/${data.company.id}/wallet/transactions`,
    },
    {
      title: "Пополнить",
      href: `/ru/crm/${data.company.id}/wallet/top-up`,
    },
  ];

  $: menuVisible = false;
</script>

<div class="flex flex-col md:flex-row">
  <nav
    class="md:bg-transparent py-2 gap-2 text-grey-800 w-full md:max-w-[40%]"
    use:clickOutside
    on:click_outside={() => (menuVisible = false)}
  >
    <button on:click={() => (menuVisible = !menuVisible)} class="flex flex-col"> Меню </button>
    <div
      class="{menuVisible
        ? 'absolute'
        : 'hidden'}  md:block default-bg border-2 rounded-xl border-gray-400 md:border-none"
    >
      <NavList items={links} pathname={$page.url.pathname} on:click={() => (menuVisible = false)} />
    </div>
  </nav>
  <slot />
</div>
