<script>
  import "../app.css";
  import Logo from "$lib/assets/logo.png";
  import Header from "$lib/assets/roll-over.png";
  import { page } from "$app/stores";
  import Link from "$lib/components/Link.svelte";
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

  $: title =
    stepsWithLinksAndTitles[steps[steps.length - 1]]?.title || "roll-over";

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

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="flex flex-col h-screen overflow-hidden">
  <nav class="p-2 flex flex-col justify-between max-h-40" bind:clientWidth={w}>
    <div class="p-2 flex justify-between max-h-20">
      <a href="/" class="flex flex-col">
        <div class="flex">
          <img src={Logo} alt="logo" class="h-10" />
          <img src={Header} alt="roll-over" class="h-10" />
        </div>
        <p class="text-slate-400">Группа открытых проектов</p>
      </a>

      <div
        class="flex flex-col sm:flex-row gap-5 p-3 text-xl h-fit rounded-2xl"
      >
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
          <ul
            class="flex flex-col sm:flex-row gap-3 bg-gray-950 z-10"
            on:click={() => (visible = false)}
          >
            {#each links as link}
              <li>
                <Link href={link.href}>{link.title}</Link>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
    <div class="pl-5">
      {#each steps as step, i}
        <a href={getUrl(steps, step)}
          >{getTitle(stepsWithLinksAndTitles[step]?.title || step)}</a
        >
        {#if step !== steps[steps.length - 1]} {" > "} {/if}
      {/each}
    </div>
  </nav>
  <main
    class="flex flex-col items-center overflow-auto"
    on:click={(e) => (visible = false)}
  >
    <slot />
  </main>
</div>
