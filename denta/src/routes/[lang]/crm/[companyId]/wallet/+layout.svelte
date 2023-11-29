<script lang="ts">
  import { page } from "$app/stores";
  import type { Company } from "$lib/types/crm";
  import Icon from "svelte-icons-pack";
  import BsWallet2 from "svelte-icons-pack/bs/BsWallet2";

  export let data: {
    company: Company;
  };

  const links = [
    {
      type: "icon",
      title: BsWallet2,
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

<div class="flex flex-col md:flex-col w-full">
  <ol class="flex flex-row w-full justify-between">
    {#each links || [] as link}
      <li>
        <a
          on:click={(e) => (menuVisible = false)}
          href={link.href}
          class="{link.href === $page.url.pathname ? 'variant-filled-secondary' : ''} btn w-full"
        >
          {#if link.type === "icon"}
            <Icon src={link.title} size="25" />
          {:else}
            {link.title}
          {/if}
        </a>
      </li>
    {/each}
  </ol>
  <slot />
</div>
