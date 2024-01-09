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
      href: `/${$page.params.lang}/crm/${data.company.id}/wallet`,
    },
    {
      title: "Подписка",
      href: `/${$page.params.lang}/crm/${data.company.id}/wallet/subscription`,
    },
    {
      title: "Транзакции",
      href: `/${$page.params.lang}/crm/${data.company.id}/wallet/transactions`,
    },
    {
      title: "Пополнить",
      href: `/${$page.params.lang}/crm/${data.company.id}/wallet/top-up`,
    },
  ];

  $: menuVisible = false;
</script>

<div class="flex w-full flex-col md:flex-col">
  <ol class="flex w-full flex-row justify-between">
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
