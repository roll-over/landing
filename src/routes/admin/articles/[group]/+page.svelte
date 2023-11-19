<script>
  import { page } from "$app/stores";
  import { collections } from "$lib/collections.js";

  export let data;

  $: inEditing = {};
  $: oldId = "";
  $: prompt = "";

  if (!collections[$page.params.group]) {
    throw new Error(`Collection ${$page.params.group} not found`);
  }

  const addArticle = async () => {
    const res = await fetch("/api/articles/" + $page.params.group, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "new-article" + Math.random(),
        title: "New article",
        type: "md",
        source: "New article description",
        status: "new",
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  };

  const saveArticle = async (id) => {
    const res = await fetch("/api/articles/" + $page.params.group, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: oldId,
        article: inEditing,
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  };

  const publishArticle = async (id) => {
    const res = await fetch("/api/articles/" + $page.params.group, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        article: {
          status: "published",
        },
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  };

  const archiveArticle = async (id) => {
    const res = await fetch("/api/articles/" + $page.params.group, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        article: {
          status: "archived",
        },
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      location.reload();
    }
  };

  const genHeader = async () => {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        group: $page.params.group,
        type: "header",
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      inEditing.title = data.title;
      inEditing.id = data.id;
    }
  };

  const genArticle = async () => {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${prompt}, ${inEditing.title}`,
        group: $page.params.group,
        type: "article",
      }),
    });
    const data = await res.text();
    if (data.error) {
      alert(data.error);
    } else {
      inEditing.source = data;
    }
  };

  const genNewId = async () => {
    inEditing.id = inEditing.title.toLowerCase().replace(/ /g, "_");
  };
</script>

<h1>Admin panel</h1>
<ul class="w-full md:w-1/2 flex flex-col gap-10">
  {#each data.entities || [] as entitiy}
    <li class="flex flex-col gap-8 p-10 rounded-xl border-2">
      {#if entitiy.id !== inEditing?.id}
        <div class="flex flex-col gap-3">
          <p>Название:</p>
          <p>{entitiy.title}</p>
        </div>
        <div class="flex flex-col gap-3">
          <p>Статус:</p>
          <p>{entitiy.status}</p>
        </div>
        <div class="flex flex-col gap-3">
          <p>id:</p>
          <p>{entitiy.id}</p>
        </div>

        <div class="flex flex-col gap-3">
          <p>Тип:</p>
          <p>{entitiy.type}</p>
        </div>

        {#if entitiy.type === "md"}
          <div class="flex flex-col gap-3">
            <p>Статья:</p>
            <p>{entitiy.source?.slice(0, 100)}</p>
          </div>
        {:else if entitiy.type === "youtube"}
          <div class="flex flex-col gap-3">
            <p>Преквью:</p>
            <iframe
              width="560"
              height="315"
              src={entitiy.url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        {/if}
        <div class="flex gap-16 justify-center">
          <button
            class="text-stone-400 hover:text-stone-500 border-2 border-stone-700 hover:border-stone-600 rounded-2xl p-2 flex justify-center"
            on:click={() => {
              inEditing = entitiy;
              oldId = entitiy.id;
            }}>Edit</button
          >
          {#if entitiy.status !== "published"}
            <button
              class="text-stone-400 hover:text-stone-500 border-2 border-stone-700 hover:border-stone-600 rounded-2xl p-2 flex justify-center"
              on:click={() => {
                publishArticle(entitiy.id);
              }}>Publish</button
            >
          {:else if entitiy.status !== "archived"}
            <button
              class="text-stone-400 hover:text-stone-500 border-2 border-stone-700 hover:border-stone-600 rounded-2xl p-2 flex justify-center"
              on:click={() => {
                archiveArticle(entitiy.id);
              }}>Archive</button
            >
          {/if}
        </div>
      {:else}
        {#if inEditing.status === "new"}
          <div class="flex flex-col gap-16 justify-center">
            <textarea bind:value={prompt} />
            <div class="flex flex-row justify-center gap-16">
              <button on:click={() => genHeader()}>Новый заголовок</button>
              <button on:click={() => genArticle()}>Новая статья</button>
              <button on:click={() => genNewId()}>Новый id</button>
            </div>
          </div>
        {/if}
        <div class="flex flex-col gap-3">
          <p>Название:</p>
          <textarea
            bind:value={inEditing.title}
            class="h-32"
            disabled={inEditing.status !== "new"}
          />
        </div>
        <div class="flex flex-col gap-3">
          <p>Статус:</p>
          <p>{inEditing.status}</p>
        </div>
        <div class="flex flex-col gap-3">
          <p>id:</p>
          <input type="text" bind:value={inEditing.id} disabled={inEditing.status !== "new"} />
        </div>
        <div class="flex flex-col gap-3">
          <p>Тип:</p>
          <select bind:value={inEditing.type} disabled={inEditing.status !== "new"}>
            <option value="md">Markdown</option>
            <option value="youtube">Youtube</option>
          </select>
        </div>

        {#if inEditing.type === "md"}
          <div class="flex flex-col gap-3">
            <p>Статья:</p>
            <textarea bind:value={inEditing.source} class="h-96" />
          </div>
        {:else if inEditing.type === "youtube"}
          <div class="flex flex-col gap-3">
            <p>Описание:</p>
            <input type="text" bind:value={inEditing.description} />
          </div>
          <div class="flex flex-col gap-3">
            <p>Ссылка:</p>
            <input type="text" bind:value={inEditing.url} />
          </div>
        {/if}

        <div class="flex flex-row gap-16 justify-center">
          <button
            class="text-stone-400 hover:text-stone-500 border-2 border-stone-700 hover:border-stone-600 rounded-2xl p-2 flex justify-center"
            on:click={() => {
              saveArticle(entitiy.id);
            }}>Save</button
          >
          <button
            class="text-stone-400 hover:text-stone-500 border-2 border-stone-700 hover:border-stone-600 rounded-2xl p-2 flex justify-center"
            on:click={() => {
              inEditing = {};
            }}>Cancel</button
          >
        </div>
      {/if}
    </li>
  {/each}

  <div class="border-2 rounded-xl flex flex-col gap-8 p-10">
    <button class="buttonPrimary" on:click={() => addArticle()}> Add new </button>
  </div>
</ul>

<style>
  input,
  textarea,
  select {
    background-color: rgb(65, 65, 65);
    padding: 10px;
  }
</style>
