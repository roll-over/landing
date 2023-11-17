<script>
  const donations = [
    {
      type: "service",
      title: "Patreon:",
      link: "https://www.patreon.com/roll_over",
    },
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
      title: "Boost сервера в Discord:",
      link: "https://discord.gg/AehGMAwdap",
    },
  ];

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert("Скопировано в буфер обмена");
  };
</script>

<h2 class="">Донаты</h2>
{#each donations as contact}
  <div class="flex justify-between flex-wrap sm:flex-row flex-col">
    <h3>{contact.title}</h3>
    {#if contact.type === "crypto"}
      <button
        class="truncate sm:w-1/2 w-full underline-offset-1 underline"
        on:click={(e) => copyToClipboard(contact.wallet)}>{contact.wallet}</button
      >
    {:else if contact.type === "boost"}
      <a href={contact.link} class="underline-offset-1 underline"
        >{contact.link}</a
      >
    {:else if contact.type === "service"}
      <a href={contact.link} class="underline-offset-1 underline">{contact.link}</a>
    {/if}
  </div>
{/each}
<p>
  Если хотите поддержать по другому, пожалуйста, наришите нам: <a
    class="underline-offset-1 underline"
    href="mailto:roll.over.projects@gmail.com">roll.over.projects@gmail.com</a
  >
</p>
