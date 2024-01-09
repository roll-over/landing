<script>
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";

  export let data;

  $: email = "";

  const addAdmin = async () => {
    const res = await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  };

  const deleteAdmin = async (email) => {
    const res = await fetch("/api/admins", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  };
</script>

<CenteredPage title="Admins">
  <ul class="flex w-full flex-col gap-10">
    {#each data.entities || [] as entitiy}
      <li class="flex flex-row justify-between gap-8 rounded-xl border-2 p-3">
        <p>
          {entitiy.email}
        </p>
        <button class="buttonPrimary" on:click={() => deleteAdmin(entitiy.email)}> Delete </button>
      </li>
    {/each}

    <div class="flex flex-col gap-8 rounded-xl border-2 p-10">
      <input type="text" placeholder="Email" bind:value={email} />
      <button class="buttonPrimary" on:click={() => addAdmin()}> Add new </button>
    </div>
  </ul>
</CenteredPage>

<style>
  input {
    background-color: rgb(65, 65, 65);
    padding: 10px;
  }
</style>
