<script lang="ts">
  import "../styles/app.css";
  import Logo from "$lib/assets/logo.png";
  import Header from "$lib/assets/roll-over.png";
  import { page } from "$app/stores";
  import NavLink from "$lib/components/NavLink.svelte";

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
      title: "Донаты",
      href: "/donations",
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
    <a href="/" class="flex flex-col">
      <div class="flex">
        <img src={Logo} alt="logo" class="h-10" />
        <img src={Header} alt="roll-over" class="h-10" />
      </div>
      <p class="text-slate-400">Группа открытых проектов</p>
    </a>

    <div class="flex flex-col sm:flex-row gap-5 p-3 text-xl h-fit rounded-xl">
      {#if w < 640}
        <button
          class="text-teal-400"
          on:click={() => {
            visible = !visible;
          }}
        >
          Меню
        </button>
      {/if}
      {#if w > 640 || visible}
        <button on:click={() => (visible = false)}>
          <ul class="flex flex-col sm:flex-row gap-1 bg-black rounded-xl z-10">
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
        </button>
      {/if}
    </div>
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
