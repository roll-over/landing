<script lang="ts">
  import "../styles/app.css";
  import Header from "$lib/assets/roll-over.webp";
  import { page } from "$app/stores";
  import NavLink from "$lib/components/NavLink.svelte";
  import BurgerIcon from "$lib/assets/burger.svg";
  import CloseIcon from "$lib/assets/close.svg";
  import { clickOutside } from "$lib/clickOutside";

  export let data: any;

  let w;
  let visible = false;

  const links = [
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
  ];

  $: path = $page.url.pathname;
  $: steps = path.split("/").filter((step) => step !== "");
  const stepsWithLinksAndTitles = {
    projects: {
      title: "Проекты",
    },
    contacts: {
      title: "Контакты",
    },
    vacancies: {
      title: "Вакансии",
    },
    anounces: {
      title: "Анонсы",
    },
    contributors: {
      title: "Контрибьюторы",
      href: "/contributors",
    },
    "red-flags": {
      title: "red-flags",
    },
    employee: {
      title: "Работникам",
    },
    "check-cv": {
      title: "Проверка резюме",
    },

    "potential-vacancy": {
      title: "Проверка потенциальной вакансии",
    },
    posts: {
      title: "Статьи",
    },
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
      <h1 class="text-2xl">denta</h1>
    </a>

    <ul class="flex flex-row gap-1">
      {#each links as link}
        <li>
          <button on:click={() => (visible = false)}>
            <NavLink href={link.href} on:click={() => (visible = false)}>{link.title}</NavLink>
          </button>
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
  <ol class="pl-5 flex items-end" itemscope itemtype="https://schema.org/BreadcrumbList">
    {#each steps.slice(1) as step, i}
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href={getUrl(steps, step)}
          ><span itemprop="name">{getTitle(stepsWithLinksAndTitles[step]?.title || step)}</span></a
        >
        <meta itemprop="position" content={i.toString()} />
      </li>
      {#if step !== steps[steps.length - 1]}
        {" > "}
      {/if}
    {/each}
  </ol>
</nav>
<slot />
