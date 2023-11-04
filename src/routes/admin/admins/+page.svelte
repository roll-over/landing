<script>
  import { page } from "$app/stores";

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

<h1>Admins</h1>
<ul class="w-full md:w-1/2 flex flex-col gap-10">
  {#each data.entities || [] as entitiy}
    <li class="flex flex-row gap-8 p-10 rounded-xl border-2 justify-between">
      <p>
        {entitiy.email}
      </p>
      <button class="buttonPrimary" on:click={() => deleteAdmin(entitiy.email)}>
        Delete
      </button>
    </li>
  {/each}

  <div class="border-2 rounded-xl flex flex-col gap-8 p-10">
    <input type="text" placeholder="Email" bind:value={email} />
    <button class="buttonPrimary" on:click={() => addAdmin()}> Add new </button>
  </div>
</ul>

<style>
  input {
    background-color: rgb(65, 65, 65);
    padding: 10px;
  }
</style>
