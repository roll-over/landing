<script lang="ts">
  import "../styles/app.css";
  import { page } from "$app/stores";
  import NavLink from "$lib/components/NavLink.svelte";
  import { Toast, initializeStores } from "@skeletonlabs/skeleton";
  import Icon from "svelte-icons-pack";
  import BsWallet2 from "svelte-icons-pack/bs/BsWallet2";
  import BsSearch from "svelte-icons-pack/bs/BsSearch";

  initializeStores();
  export let data: { countries: any[]; cities: any[] };

  let w;

  $: links = [
    {
      type: "icon",
      title: BsSearch,
      href: "/ru",
      ariaLabel: "Поиск",
    },
    {
      title: "CRM",
      href: "/ru/crm",
    },
    ...($page.params.companyId && data.usersCompanies?.includes($page.params.companyId)
      ? [
          {
            type: "icon",
            title: BsWallet2,
            href: `/ru/crm/${$page.params.companyId}/wallet`,
            ariaLabel: "Кошелек",
          },
        ]
      : []),
  ];

  $: path = $page.url.pathname;
  $: steps = path.split("/").filter((step) => step !== "");

  const stepsWithLinksAndTitles = {
    search: {
      title: "Поиск",
    },
    contacts: {
      title: "Контакты",
    },
    c: {
      title: "Компания",
    },
    posts: {
      title: "Статьи",
    },
    about: {
      title: "О нас",
    },
    company: {
      title: "Компания",
    },
    appointments: {
      title: "Записи",
    },
    clients: {
      title: "Пациенты",
    },
    cabinets: {
      title: "Кабинеты",
    },
    employees: {
      title: "Доктора",
    },
    "price-list": {
      title: "Прайс лист",
    },
    wallet: {
      title: "Кошелек",
    },
    subscription: {
      title: "Подписка",
    },
    transactions: {
      title: "Транзакции",
    },
    "top-up": {
      title: "Пополнить",
    },
    signin: {
      title: "Войти",
    },
    signup: {
      title: "Зарегистрироваться",
    },
    "create-company": {
      title: "Создать компанию",
    },
    ...data.countries.reduce((acc, country) => {
      acc[country.id] = {
        title: country[$page.params.lang],
      };
      return acc;
    }, {}),

    ...data.cities.reduce((acc, city) => {
      acc[city.id] = {
        title: city[$page.params.lang],
      };
      return acc;
    }, {}),
  };

  const getUrl = (steps, step) => {
    const index = steps.indexOf(step);
    return "/" + steps.slice(0, index + 1).join("/");
  };

  const getTitle = (title) => {
    if (title.length > 10) {
      return title.slice(0, 10) + "...";
    }
    return title;
  };
</script>

<header class="p-2 flex flex-col justify-between" bind:clientWidth={w}>
  <nav>
    <Toast position={"tr"} />

    <div class="p-2 flex flex-col md:flex-row justify-between items-center">
      <a href="/" class="flex flex-row">
        <img src="/logo.webp" class="logo rounded-xl" alt="logo denta-crm" />
      </a>

      <ol class="flex flex-row flex-wrap gap-1 items-center">
        {#each links as link}
          <li>
            <NavLink href={link.href} ariaLabel={link.ariaLabel}>
              {#if link.type === "icon"}
                <Icon src={link.title} size="25" />
              {:else}
                {link.title}
              {/if}
            </NavLink>
          </li>
        {/each}
        <li>
          {#if $page.data.session}
            <NavLink href="/auth/signout">
              {#if $page.data.session.user?.image}
                <img src={$page.data.session.user.image} class="rounded-2xl w-8 h-8" alt="avatar" />
              {/if}
            </NavLink>
          {:else}
            <NavLink href="/auth/signin">Войти</NavLink>
          {/if}
        </li>
      </ol>
    </div>
    <ol class="pl-5 breadcrumb flex-wrap" itemscope itemtype="https://schema.org/BreadcrumbList">
      {#each steps.slice(1) as step, i}
        <li
          class="crumb"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a class="anchor" itemprop="item" href={getUrl(steps, step)}
            ><span itemprop="name">{getTitle(stepsWithLinksAndTitles[step]?.title || step)}</span
            ></a
          >
          <meta itemprop="position" content={i.toString()} />
        </li>
        {#if step !== steps[steps.length - 1]}
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        {/if}
      {/each}
    </ol>
  </nav>
</header>
<main>
  <slot />
</main>
<footer>
  <div>
    <div class="flex flex-col md:flex-row justify-between p-2 text-xs text-slate-500">
      <div class="flex flex-col gap-2">
        <span class="text-2xl">denta-crm</span>
        <span>© 2024 denta-crm</span>
      </div>

      <div class="flex flex-col gap-2">
        <a href="https://github.com/roll-over/landing" class="text-slate-500 p-2">Source code</a>
        <a href="https://roll-over.org/" class="text-slate-500 p-2">roll-over</a>
        <a href={`/${$page.params.lang}/about`} class="text-slate-500 p-3">About</a>
      </div>

      <div class="flex flex-col gap-2">
        <a href="/documents/cookie-policy" class="text-slate-500 p-3">Cookie Policy</a>
        <a href="/documents/privacy-policy" class="text-slate-500 p-2">Privacy Policy</a>
        <a href="/documents/terms-of-service" class="text-slate-500 p-2">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

<style>
  main {
    min-height: calc(100vh - 150px);
    padding-bottom: 50px;
  }
  footer {
    min-height: 150px;
    background-color: rgba(44, 135, 255, 0.123);
  }

  .logo {
    height: 50px;
    width: 220px;
  }
</style>
