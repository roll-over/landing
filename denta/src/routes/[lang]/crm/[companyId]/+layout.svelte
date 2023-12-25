<script lang="ts">
  import { page } from "$app/stores";
  import { appParams } from "$lib/app_name";
  import { clickOutside } from "$lib/clickOutside";
  import NavList from "$lib/components/NavList.svelte";
  import type { Company } from "$lib/types/crm";

  export let data: {
    company: Company;
  };

  const links = [] as { title: string; href: string }[];

  if (appParams.availabilities.appointments) {
    links.push({
      title: "Записи",
      href: `/${$page.params.lang}/crm/${data.company.id}/appointments`,
    });
  }

  if (appParams.availabilities.clients) {
    links.push({
      title: "Пациенты",
      href: `/${$page.params.lang}/crm/${data.company.id}/clients`,
    });
  }

  links.push(
    ...[
      {
        title: "Компания",
        href: `/${$page.params.lang}/crm/${data.company.id}/company`,
      },
    ],
  );

  if (appParams.availabilities.cabinets) {
    links.push({
      title: "Кабинеты",
      href: `/${$page.params.lang}/crm/${data.company.id}/cabinets`,
    });
  }
  if (appParams.availabilities.employees) {
    links.push({
      title: "Доктора",
      href: `/${$page.params.lang}/crm/${data.company.id}/employees`,
    });
  }

  if (appParams.availabilities.priceList) {
    links.push({
      title: "Прайс лист",
      href: `/${$page.params.lang}/crm/${data.company.id}/price-list`,
    });
  }
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
