<script lang="ts">
  import "../styles/app.css";
  import { page } from "$app/stores";
  import NavLink from "$lib/components/NavLink.svelte";
  import { Toast, initializeStores } from "@skeletonlabs/skeleton";
  import Icon from "svelte-icons-pack";
  import BsWallet2 from "svelte-icons-pack/bs/BsWallet2";
  import BsSearch from "svelte-icons-pack/bs/BsSearch";
  import Auth from "$lib/components/Auth.svelte";
  import Logout from "$lib/components/Logout.svelte";

  import { clickOutside } from "$lib/clickOutside";

  import { localisation } from "$lib/localisation/localisation";
  let l = localisation($page.params.lang);
  $: l = localisation($page.params.lang);

  initializeStores();
  export let data: { countries: any[]; cities: any[] };

  let w;

  $: links = [
    {
      type: "icon",
      title: BsSearch,
      href: `/${$page.params.lang}/search`,
      ariaLabel: l("Поиск"),
    },
    {
      title: "CRM",
      href: data.usersCompanies?.length
        ? `/${$page.params.lang}/crm/${data.usersCompanies[0]?.id}/company`
        : `/${$page.params.lang}/crm/info`,
    },
    {
      title: l("Статьи"),
      href: `/${$page.params.lang}/articles`,
    },
    ...($page.params.companyId && data.usersCompanies?.includes($page.params.companyId)
      ? [
          {
            type: "icon",
            title: BsWallet2,
            href: `/${$page.params.lang}/crm/${$page.params.companyId}/wallet`,
            ariaLabel: l("Кошелек"),
          },
        ]
      : []),
  ];

  $: path = $page.url.pathname;
  $: steps = path.split("/").filter((step) => step !== "");

  const stepsWithLinksAndTitles = {
    search: {
      title: l("Поиск"),
    },
    contacts: {
      title: l("Контакты"),
    },
    c: {
      title: l("Компания"),
    },
    posts: {
      title: l("Статьи"),
    },
    about: {
      title: l("О нас"),
    },
    company: {
      title: l("Компания"),
    },
    appointments: {
      title: l("Записи"),
    },
    clients: {
      title: l("Пациенты"),
    },
    cabinets: {
      title: l("Кабинеты"),
    },
    employees: {
      title: l("Доктора"),
    },
    "price-list": {
      title: l("Прайс-лист"),
    },
    wallet: {
      title: l("Кошелек"),
    },
    subscription: {
      title: l("Подписка"),
    },
    transactions: {
      title: l("Транзакции"),
    },
    "top-up": {
      title: l("Пополнить"),
    },
    signin: {
      title: l("Войти"),
    },
    signup: {
      title: l("Зарегистрироваться"),
    },
    "create-company": {
      title: l("Создать компанию"),
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

  $: pickingLang = false;
</script>

<header class="p-2 flex flex-col justify-between" bind:clientWidth={w}>
  <nav>
    <Toast position={"tr"} />

    <div class="p-2 flex flex-col md:flex-row justify-between items-center">
      <a href={`/${$page.params.lang}`} class="flex flex-row">
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
          <div>
            <button
              class="btn variant-ghost"
              on:click={() => {
                pickingLang = !pickingLang;
              }}
            >
              {$page.params.lang === "ru" ? "Русский" : "English"}
            </button>
            <ul
              class={`bg-transparent ${pickingLang ? "absolute" : "hidden"}`}
              use:clickOutside
              on:click_outside={() => (pickingLang = false)}
            >
              <li>
                <a
                  class="btn"
                  href={$page.params.lang === "ru"
                    ? $page.url.pathname
                    : $page.url.pathname.replace("/en", "/ru")}
                  on:click={() => {
                    pickingLang = false;
                  }}>Русский</a
                >
              </li>
              <li>
                <a
                  class="btn"
                  href={$page.params.lang === "en"
                    ? $page.url.pathname
                    : $page.url.pathname.replace("/ru", "/en")}
                  on:click={() => {
                    pickingLang = false;
                  }}>English</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li>
          {#if $page.data.session}
            <Logout>
              {#if $page.data.session.user?.image}
                <img src={$page.data.session.user.image} class="rounded-2xl w-8 h-8" alt="avatar" />
              {/if}
            </Logout>
          {:else}
            <Auth>Войти</Auth>
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
        <a
          href="https://github.com/roll-over/landing?utm_source=denta-crm.com"
          class="text-slate-500 md:p-1 p-3">Source code</a
        >
        <a href="https://roll-over.org/?utm_source=denta-crm.com" class="text-slate-500 md:p-1 p-3"
          >roll-over</a
        >
        <a href={`/${$page.params.lang}/about`} class="text-slate-500 md:p-1 p-3">About</a>
      </div>

      <div class="flex flex-col gap-2">
        <a href={`/${$page.params.lang}/documents/cookie-policy`} class="text-slate-500 md:p-1 p-3"
          >Cookie Policy</a
        >
        <a href={`/${$page.params.lang}/documents/privacy-policy`} class="text-slate-500 md:p-1 p-3"
          >Privacy Policy</a
        >
        <a
          href={`/${$page.params.lang}/documents/terms-of-service`}
          class="text-slate-500 md:p-1 p-3">Terms of Service</a
        >
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
