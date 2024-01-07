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
      title: "Наши друзья",
      href: "/friends",
    },
    {
      title: "О нас",
      href: "/about",
    },
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
      <img src="/logo.webp" alt="logo" class="h-10 w-14" />
      <span class="text-4xl font-bold text-center text-green-500">roll-over</span>
    </a>

    {#if visible}
      <div
        class=" border-2 border-teal-400 bg-black fixed top-6 right-6 rounded-b-xl rounded-tl-xl z-10"
      >
        <div class="flex justify-between p-2">
          <p>Меню</p>
          <img src={CloseIcon} alt="logo" class="h-8 w-10" />
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
  <ol class="pl-5 flex items-end" itemscope itemtype="https://schema.org/BreadcrumbList">
    {#each steps as step, i}
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
<main class="flex overflow-auto">
  <slot />
</main>
