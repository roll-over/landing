<script lang="ts">
  import "../styles/app.css";
  import Logo from "$lib/assets/logo.png";
  import Header from "$lib/assets/roll-over.png";
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
      title: "Проекты",
      href: "/projects",
    },
    {
      title: "Анонсы",
      href: "/anounces",
    },
    {
      title: "Статьи",
      href: "/posts",
    },
    {
      title: "Контакты",
      href: "/contacts",
    },
    {
      title: "Вакансии",
      href: "/vacancies",
    },
    {
      title: "Контрибьюторы",
      href: "/contributors",
    },
    { title: "Донаты", href: "/donations" },
  ];

  if (data.isAdmin) {
    links.push({
      title: "Админка",
      href: "/admin",
    });
  }

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
      <img src={Logo} alt="logo" class="h-10" />
      <img src={Header} alt="roll-over" class="h-10 hidden xl:block" />
    </a>

    {#if visible}
      <div
        class=" border-2 border-teal-400 bg-black fixed top-6 right-6 rounded-b-xl rounded-tl-xl z-10"
      >
        <div class="flex justify-between p-2">
          <p>Меню</p>
          <img src={CloseIcon} alt="logo" class="h-8" />
        </div>

        <ul class="flex flex-col gap-1" use:clickOutside on:click_outside={() => (visible = false)}>
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
    {:else}
      <button
        class="text-teal-400"
        on:click={() => {
          visible = !visible;
        }}
      >
        <img src={BurgerIcon} alt="logo" class="h-6" />
      </button>
    {/if}
  </div>
  <div class="pl-5">
    {#each steps as step, i}
      <a href={getUrl(steps, step)}>{getTitle(stepsWithLinksAndTitles[step]?.title || step)}</a>
      {#if step !== steps[steps.length - 1]}
        {" > "}
      {/if}
    {/each}
  </div>
</nav>
<main class="flex flex-col items-center overflow-auto">
  <slot />
</main>
