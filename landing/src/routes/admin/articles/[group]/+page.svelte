<script lang="ts">
  import { page } from "$app/stores";
  import { collections } from "$lib/collections";
  import type { Article } from "$lib/assets/articles/articles";
  import type { PromptByGroupAndType } from "$lib/types/gpt.js";

  export let data;

  $: inEditing = {} as Article;
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
          publishDate: new Date(),
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
      } as PromptByGroupAndType),
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
      } as PromptByGroupAndType),
    });
    const data = await res.text();
    if (data.error) {
      alert(data.error);
    } else {
      inEditing.source = data;
    }
  };

  const genFAQ = async () => {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${prompt}, ${inEditing.title}, ${
          inEditing.type === "md" ? inEditing.source : inEditing.description
        }`,
        group: $page.params.group,
        type: "faq",
      } as PromptByGroupAndType),
    });
    const data = await res.text();
    if (data.error) {
      alert(data.error);
    } else {
      inEditing.faq = JSON.parse(data);
    }
  };

  function convertToTranslit(str) {
    const translitMap = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "sch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    };

    str = str.replace(/[^a-zа-яё\s]/gi, "");

    str = str.toLowerCase();

    const copyStr = str;

    for (let i = 0; i < copyStr.length; i++) {
      const char = copyStr[i];

      if (translitMap[char]) {
        str = str.replace(char, translitMap[char]);
      } else if (char === "ь" || char === "ъ") {
        str = str.replace(char, "");
      }
    }
    str = str.replace(/ /g, "_");

    str += "_" + Math.random().toString(36).substr(2, 9);

    return str;
  }
  const genNewId = async () => {
    inEditing.id = convertToTranslit(inEditing.title);
  };
</script>

<div class="flex w-full flex-col items-center">
  <h1>Admin panel</h1>

  <div class="flex flex-col gap-8 rounded-xl border-2 p-10">
    <button class="buttonPrimary" on:click={() => addArticle()}> Add new </button>
  </div>
  <ul class="flex w-full flex-col gap-10 md:w-9/12">
    {#each data.entities || [] as entitiy}
      {#if inEditing && entitiy.id === inEditing.id}
        <li class="flex flex-col gap-8 rounded-xl border-2 p-10">
          {#if inEditing.status === "new"}
            <div class="flex flex-col justify-center gap-16">
              <textarea bind:value={prompt} />
              <div class="flex flex-row justify-center gap-16">
                <button on:click={() => genHeader()}>Новый заголовок</button>
                <button on:click={() => genArticle()}>Новая статья</button>
                <button on:click={() => genNewId()}>Новый id</button>
                <button on:click={() => genFAQ()}>Новый FAQ</button>
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

            <div class="flex flex-col gap-10">
              {#each inEditing?.faq || [] as faq, i}
                <div class="pd-10 flex flex-col">
                  <button
                    class="flex justify-center rounded-2xl border-2 border-stone-700 p-2 text-stone-400 hover:border-stone-600 hover:text-stone-500"
                    on:click={() => {
                      inEditing.faq.splice(i, 1);
                      inEditing.faq = [...inEditing.faq];
                    }}>Delete</button
                  >
                  Q: <textarea bind:value={faq.question} />
                  A: <textarea bind:value={faq.answer} />
                  D: <textarea bind:value={faq.description} />
                </div>
              {/each}
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

          <div class="flex flex-row justify-center gap-16">
            <button
              class="flex justify-center rounded-2xl border-2 border-stone-700 p-2 text-stone-400 hover:border-stone-600 hover:text-stone-500"
              on:click={() => {
                saveArticle(entitiy.id);
              }}>Save</button
            >
            <button
              class="flex justify-center rounded-2xl border-2 border-stone-700 p-2 text-stone-400 hover:border-stone-600 hover:text-stone-500"
              on:click={() => {
                inEditing = {};
              }}>Cancel</button
            >
          </div>
        </li>
      {:else}
        <li class="flex flex-row gap-4 rounded-xl border-2 p-10">
          <div class="flex flex-col gap-3">
            <p>{entitiy.title}</p>
            <p>{entitiy.id.slice(0, 20)}</p>
          </div>
          <div class="flex flex-col gap-3">
            <p>{entitiy.status}</p>
            <p>{entitiy.type}</p>
          </div>

          {#if entitiy.type === "md"}
            <div class="flex flex-col gap-3">
              <p>{entitiy.source?.slice(0, 20)}</p>
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
          <div class="flex flex-col justify-center gap-16">
            <button
              class="flex justify-center rounded-2xl border-2 border-stone-700 p-2 text-stone-400 hover:border-stone-600 hover:text-stone-500"
              on:click={() => {
                inEditing = entitiy;
                oldId = entitiy.id;
              }}>Edit</button
            >
            {#if entitiy.status !== "published"}
              <button
                class="flex justify-center rounded-2xl border-2 border-stone-700 p-2 text-stone-400 hover:border-stone-600 hover:text-stone-500"
                on:click={() => {
                  publishArticle(entitiy.id);
                }}>Publish</button
              >
            {:else if entitiy.status !== "archived"}
              <button
                class="flex justify-center rounded-2xl border-2 border-stone-700 p-2 text-stone-400 hover:border-stone-600 hover:text-stone-500"
                on:click={() => {
                  archiveArticle(entitiy.id);
                }}>Archive</button
              >
            {/if}
          </div>
        </li>
      {/if}
    {/each}
  </ul>

  <style>
    input,
    textarea,
    select {
      background-color: rgb(65, 65, 65);
      padding: 10px;
    }
  </style>
</div>
