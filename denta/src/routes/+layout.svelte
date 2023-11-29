<script lang="ts">
  import "../styles/app.css";
  import { page } from "$app/stores";
  import NavLink from "$lib/components/NavLink.svelte";

  export let data: { countries: any[]; cities: any[] };

  let w;

  $: links = [
    {
      title: "Клиники",
      href: "/ru",
    },
    {
      title: "О нас",
      href: "/ru/about",
    },
    {
      title: "CRM",
      href: "/ru/crm",
    },
    ...($page.params.companyId
      ? [
          {
            title: "Кошелек",
            href: `/ru/crm/${$page.params.companyId}/wallet`,
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

<nav class="p-2 flex flex-col justify-between max-h-40" bind:clientWidth={w}>
  <div class="p-2 flex justify-between max-h-20">
    <a href="/" class="flex flex-row">
      <span class="text-2xl">denta</span>
    </a>

    <ul class="flex flex-row gap-1">
      {#each links as link}
        <li>
          <NavLink href={link.href}>{link.title}</NavLink>
        </li>
      {/each}
      <li>
        {#if $page.data.session}
          <NavLink href="/auth/signout">
            {#if $page.data.session.user?.image}
              <img src={$page.data.session.user.image} class="rounded-2xl w-8" alt="avatar" />
            {/if}
          </NavLink>
        {:else}
          <NavLink href="/auth/signin">Войти</NavLink>
        {/if}
      </li>
    </ul>
  </div>
  <ol class="pl-5 breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
    {#each steps.slice(1) as step, i}
      <li class="crumb" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a class="anchor" itemprop="item" href={getUrl(steps, step)}
          ><span itemprop="name">{getTitle(stepsWithLinksAndTitles[step]?.title || step)}</span></a
        >
        <meta itemprop="position" content={i.toString()} />
      </li>
      {#if step !== steps[steps.length - 1]}
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
      {/if}
    {/each}
  </ol>
</nav>
<slot />
