<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";

  export let data: {
    contractsNotifications: {
      id: string;
      companyId: string;
      description: string;
      date: string;
      fileNames: string[];
      title: string;
    }[];
  };

  $: console.log(data.contractsNotifications);

  $: form = {
    fileNames: [],
    description: "",
    date: "",
    title: "",
  };
  $: adding = false;
  $: editing = false;
  const submit = async (e) => {
    e.preventDefault();

    const files = [];

    for (const _file of file.files) {
      if (_file) {
        files.push(_file);
      }
    }

    let newFileNames = await Promise.all(
      files.map(async (f) => {
        if (f) {
          const formData = new FormData();
          formData.append("file", f);
          const res = await fetch($page.url.pathname + "/documents", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          return data.fileName;
        }
      }),
    );

    const res2 = await fetch($page.url.pathname + "/contracts-notifications", {
      method: editing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: form.description,
        date: form.date,
        fileNames: [...(newFileNames || []), ...(form?.fileNames || [])],
        title: form.title,
        id: editing ? form?.id : undefined,
      }),
    });

    const data2 = await res2.json();

    if (data2.status === "ok") {
      invalidateAll();

      adding = false;
      editing = false;
      form = {
        description: "",
        date: "",
        title: "",
        fileNames: [],
      };
    }
  };
</script>

<div class="w-full">
  <div class={`${adding || editing ? "flex" : "hidden"} flex-col card `}>
    <header class="card-header">
      <label for="title">Название</label>
      <input type="text" name="title" id="title" bind:value={form.title} class="input" />
    </header>
    <div class="p-4">
      <ul class="list">
        {#each form.fileNames as fileName, i}
          <li class="flex flex-wrap">
            <span>{i}. </span>
            <span>
              {fileName}
            </span>
            <span>
              <button
                class="btn variant-filled-secondary"
                on:click={() => {
                  form.fileNames = form.fileNames.filter((f) => f !== fileName);
                }}>Удалить</button
              >
            </span>
            <span>
              <a
                href={`${$page.url.pathname}/documents/${encodeURIComponent(fileName)}`}
                download
                class="btn variant-filled-secondary"
              >
                Скачать
              </a>
            </span>
          </li>
        {/each}
      </ul>
      <label for="file">Выберите файл</label>
      <input type="file" name="file" id="file" multiple="multiple" class="input" />

      <label for="description">Описание</label>
      <input
        type="text"
        name="description"
        id="description"
        class="input"
        bind:value={form.description}
      />

      <label for="date">Дата окончания</label>
      <input type="date" name="date" id="date" bind:value={form.date} class="input" />
    </div>
    <footer class="card-footer">
      <button class="btn variant-filled-secondary" on:click={submit}>Загрузить</button>
    </footer>
  </div>

  <div class={`${adding || editing ? "hidden" : "flex"} flex-col p-4 gap-4 w-full`}>
    <div>
      <button
        class=" btn variant-filled-secondary"
        on:click={() => {
          adding = !adding;
        }}>Добавить контракт</button
      >
    </div>

    {#each data.contractsNotifications as contractsNotifications}
      <div class="card w-full">
        <header class="card-header overflow-hidden">
          <p class="card-header-title text-pretty">
            {contractsNotifications.title}
          </p>
        </header>
        <div class="p-2 md:p-6 gap-2 md:gap-6 flex flex-col w-full">
          <div class="p-4 card w-full">
            <h2>Документ:</h2>
            {#each contractsNotifications.fileNames as fileName}
              <div class="p-4 text-pretty">
                <p class="text-wrap overflow-hidden">
                  {fileName?.split("/")[2] || fileName}
                </p>
                <div>
                  <button
                    class="btn variant-filled-secondary"
                    on:click={async () => {
                      const res = await fetch(
                        $page.url.pathname +
                          "/documents/" +
                          encodeURIComponent(fileName) +
                          "/" +
                          contractsNotifications.id,
                        {
                          method: "DELETE",
                        },
                      );
                      const data = await res.json();
                      if (data.status === "ok") {
                        invalidateAll();
                      }
                    }}>Удалить</button
                  >

                  <a
                    href={`${$page.url.pathname}/documents/${encodeURIComponent(fileName)}`}
                    download
                    class="btn variant-filled-secondary"
                  >
                    Скачать
                  </a>
                </div>
              </div>
            {/each}
          </div>
          <div class="p-4 card w-full">
            <h2>Описание:</h2>
            {contractsNotifications.description}
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="btn variant-filled-secondary"
            on:click={() => {
              editing = !editing;
              form = contractsNotifications;
            }}>Редактировать</button
          >
          <button
            class="btn variant-filled-secondary"
            on:click={async () => {
              const res = await fetch(
                $page.url.pathname + "/contracts-notifications/" + contractsNotifications.id,
                {
                  method: "DELETE",
                },
              );
              const data = await res.json();
              if (data.status === "ok") {
                invalidateAll();
              }
            }}>Удалить</button
          >
        </footer>
      </div>
    {/each}
  </div>
</div>
