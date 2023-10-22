<script>
  const contacts = [
    {
      href: "mailto:roll.over.projects@gmail.com",
      title: "Пишите нам:",
      description: "roll.over.projects@gmail.com",
    },
    {
      href: "https://discord.gg/5hn2cafrNa",
      title: "Заходите к нам:",
      description: "Дискорд сервер",
    },
    {
      href: "https://twitter.com/roll_over_group",
      title: "Подписывайтесь на нас:",
      description: "Twitter",
    },
    {
      href: "https://github.com/roll-over",
      title: "Подключайтейсь к нам в open source:",
      description: "Github",
    },
  ];
</script>

<div class="flex flex-col flex-wrap gap-5 w-full max-w-lg gap-10 p-10">
  <h2 class="">Контакты</h2>
  {#each contacts as contact}
    <div class="flex justify-between flex-wrap">
      <h3>{contact.title}</h3>
      <a href={contact.href}>{contact.description}</a>
    </div>
  {/each}
</div>
