<script lang="ts">
  import { page } from "$app/stores";
  import { getAppParams } from "$lib/app_name";
  import { clickOutside } from "$lib/clickOutside";
  import NavList from "$lib/components/NavList.svelte";
  import type { Company } from "$lib/types/crm";

  import { localisation } from "$lib/localisation/localisation";
  const l = localisation($page.params.lang);

  export let data: {
    company: Company;
  };

  const links = [] as { title: string; href: string }[];

  if (getAppParams().availabilities.appointments) {
    links.push({
      title: l("Записи"),
      href: `/${$page.params.lang}/crm/${data.company.id}/appointments`,
    });
  }

  if (getAppParams().availabilities.clients) {
    links.push({
      title: l("Пациенты"),
      href: `/${$page.params.lang}/crm/${data.company.id}/clients`,
    });
  }

  links.push({
    title: l("Компания"),
    href: `/${$page.params.lang}/crm/${data.company.id}/company`,
  });

  if (getAppParams().availabilities.cabinets) {
    links.push({
      title: l("Кабинеты"),
      href: `/${$page.params.lang}/crm/${data.company.id}/cabinets`,
    });
  }
  if (getAppParams().availabilities.employees) {
    links.push({
      title: l("Доктора"),
      href: `/${$page.params.lang}/crm/${data.company.id}/employees`,
    });
  }

  if (getAppParams().availabilities.priceList) {
    links.push({
      title: l("Прайс-лист"),
      href: `/${$page.params.lang}/crm/${data.company.id}/price-list`,
    });
  }

  if(getAppParams().availabilities.contractsNotifications){
    links.push({
      title: l("Уведомления"),
      href: `/${$page.params.lang}/crm/${data.company.id}/contracts-notifications`,
    });
  }

  $: menuVisible = false;
</script>

<div class="flex flex-col md:flex-row w-full">
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
  <aside class="hidden md:block w-full md:max-w-[20%]"></aside>
</div>
