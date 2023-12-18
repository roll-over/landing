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
      title: "Записи",
      href: `/${$page.params.lang}/crm/${data.company.id}/appointments`,
    },
    {
      title: "Пациенты",
      href: `/${$page.params.lang}/crm/${data.company.id}/clients`,
    },
    {
      title: "Компания",
      href: `/${$page.params.lang}/crm/${data.company.id}/company`,
    },
    {
      title: "Филиалы",
      href: `/${$page.params.lang}/crm/${data.company.id}/cabinets`,
    },
    {
      title: "Доктора",
      href: `/${$page.params.lang}/crm/${data.company.id}/employees`,
    },
    {
      title: "Прайс лист",
      href: `/${$page.params.lang}/crm/${data.company.id}/price-list`,
    },
  ];

  $: menuVisible = false;
</script>

<div class="flex flex-col md:flex-row">
  <nav
    class="md:bg-transparent py-2 gap-2 text-grey-800 w-full md:max-w-[20%]"
    use:clickOutside
    on:click_outside={() => (menuVisible = false)}
  >
    <button on:click={() => (menuVisible = !menuVisible)} class="btn md:hidden"> Меню </button>
    <div
      class="{menuVisible
        ? 'absolute'
        : 'hidden'}  md:block default-bg border-2 rounded-xl border-gray-400 md:border-none z-50"
    >
      <NavList items={links} pathname={$page.url.pathname} on:click={() => (menuVisible = false)} />
    </div>
  </nav>

  <slot />
  <aside class="w-full md:max-w-[20%]"></aside>
</div>
