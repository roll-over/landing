<script>
  const donations = [
    {
      type: "crypto",
      title: "Etherium:",
      wallet: "0x8128E4b440Eac6fae9aB2E70655d7F9fBe54d857",
    },
    {
      type: "crypto",
      title: "Bitcoin:",
      wallet: "bc1q4sx0k7kvecglgfs3meh0l450xx03qh2x8lf8mp",
    },
    {
      type: "crypto",
      title: "USDT:",
      wallet: "0x8128E4b440Eac6fae9aB2E70655d7F9fBe54d857",
    },
    {
      type: "crypto",
      title: "USDC:",
      wallet: "0x8128E4b440Eac6fae9aB2E70655d7F9fBe54d857",
    },
    {
      type: "boost",
      title: "Boost server:",
      link: "https://discord.gg/AehGMAwdap",
    },
  ];
</script>

<svelte:head>
  <title>Донаты</title>
  <meta
    name="description"
    content="Донаты: {donations
      .slice(0, 5)
      .map((contact) => contact?.title)
      .join(', ')}}"
  />
</svelte:head>

<div class="flex flex-col flex-wrap gap-5 w-full max-w-lg gap-10 p-10">
  <h2 class="">Донаты</h2>
  {#each donations as contact}
    <div class="flex justify-between flex-wrap">
      <h3>{contact.title}</h3>
      {#if contact.type === "crypto"}
        <p>{contact.wallet}</p>
      {:else if contact.type === "boost"}
        <a href={contact.link}
          >Вы можете забустить сервер, что повысит качество видео</a
        >
      {/if}
    </div>
  {/each}
  <p>
    Если хотите поддержать по другому, пожалуйста, наришите нам <a
      href="mailto:roll.over.projects@gmail.com">roll.over.projects@gmail.com</a
    >
  </p>
</div>
