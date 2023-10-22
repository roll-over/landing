<script>
  import "../app.css";
  import Logo from "$lib/assets/logo.png";
  import Header from "$lib/assets/roll-over.png";
  import { page } from "$app/stores";

  let w;
  let visible = false;

  const links = [
    {
      title: "Проекты",
      href: "/projects",
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
      href: "/contributors"
    },
  ];

  console.log($page.url.pathname);
  $: path = $page.url.pathname;
  $: steps = path.split("/").filter((step) => step !== "");
  const stepsWithLinksAndTitles = {
    projects: {
      title: "Проекты",
      href: "/projects",
    },
    contacts: {
      title: "Контакты",
      href: "/contacts",
    },
    vacancies: {
      title: "Вакансии",
      href: "/vacancies",
    },
    contributors: {
      title: "Контрибьюторы",
      href: "/contributors"
    },
    "red-flags": {
      title: "red-flags",
      href: "/projects/red-flags",
    },
    "potential-vacancy": {
      title: "Проверка потенциальной вакансии",
      href: "/projects/red-flags/potential-vacancy",
    },
  };

  $: title =
    stepsWithLinksAndTitles[steps[steps.length - 1]]?.title || "roll-over";
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
                <a
                  href={link.href}
                  class="text-teal-400 hover:text-teal-600 border-2 border-cyan-900 hover:border-cyan-800 hover:underline underline-offset-1 rounded-2xl p-2"
                  >{link.title}</a
                >
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
    <div class="pl-5">
      {#each steps as step, i}
        <a href={stepsWithLinksAndTitles[step]?.href || path}
          >{stepsWithLinksAndTitles[step]?.title || step}</a
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
