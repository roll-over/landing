<script lang="ts">
  import { page } from "$app/stores";
  import { clickOutside } from "$lib/clickOutside";
  import type { Company } from "$lib/types/crm";

  export let data: {
    company: Company;
  };

  const links = [
    {
      title: "Компания",
      href: `/ru/crm/${data.company.id}/company`,
    },
    {
      title: "Клиенты",
      href: `/ru/crm/${data.company.id}/clients`,
    },
    {
      title: "Записи",
      href: `/ru/crm/${data.company.id}/appointments`,
    },
    {
      title: "Прайс лист",
      href: `/ru/crm/${data.company.id}/price-list`,
    },
    {
      title: "Доктора",
      href: `/ru/crm/${data.company.id}/employees`,
    },
    {
      title: "Кабинеты",
      href: `/ru/crm/${data.company.id}/cabinets`,
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
    <button on:click={() => (menuVisible = !menuVisible)} class="flex flex-col"> Меню </button>
    <ol class="w-full {menuVisible ? 'absolute' : 'hidden'}  md:block default-bg">
      {#each links as link}
        <li class="w-full">
          <a
            on:click={() => (menuVisible = false)}
            href={link.href}
            class="{link.href === $page.url.pathname ? 'bg-gray-300  ' : ''} p-1 w-full"
            >{link.title}
          </a>
        </li>
      {/each}
    </ol>
  </nav>
  <slot />
</div>
