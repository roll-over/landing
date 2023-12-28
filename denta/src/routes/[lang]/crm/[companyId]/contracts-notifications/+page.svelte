<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { localisation } from "$lib/localisation/localisation";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import EditButton from "$lib/components/EditButton.svelte";
  import AddButton from "$lib/components/AddButton.svelte";
  import DownloadButton from "$lib/components/DownloadButton.svelte";
  const l = localisation($page.params.lang);
  const toastStore = getToastStore();
  let files: FileList;

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

  $: form = {
    id: "",
    fileNames: [],
    description: "",
    date: "",
    title: "",
  };
  $: adding = false;
  $: editing = false;

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      toastStore.trigger({
        message: l("Название не может быть пустым"),
        background: "variant-filled-error",
      });
      return;
    }

    if (!form.date) {
      toastStore.trigger({
        message: l("Дата не может быть пустой"),
        background: "variant-filled-error",
      });
      return;
    }

    if (form.date < new Date().toISOString().split("T")[0]) {
      toastStore.trigger({
        message: l("Дата не может быть меньше текущей"),
        background: "variant-filled-error",
      });
      return;
    }

    const _files: File[] = [];

    for (const _file of files) {
      if (_file) {
        _files.push(_file);
      }
    }

    if (_files.length === 0 && form.fileNames.length === 0) {
      toastStore.trigger({
        message: l("Файл не может быть пустым"),
        background: "variant-filled-error",
      });
      return;
    }

    let newFileNames = await Promise.all(
      _files.map(async (f) => {
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
    ).catch((e) => {
      toastStore.trigger({
        message: l("Ошибка при загрузке файла"),
        background: "variant-filled-error",
      });
      throw e;
    });

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
    }).catch((e) => {
      toastStore.trigger({
        message: l("Ошибка при сохранении контракта"),
        background: "variant-filled-error",
      });
      throw e;
    });

    const data2 = await res2.json();

    if (data2.status === "ok") {
      invalidateAll();

      adding = false;
      editing = false;
      form = {
        id: "",
        description: "",
        date: "",
        title: "",
        fileNames: [],
      };
    } else {
      toastStore.trigger({
        message: l("Ошибка при сохранении контракта"),
        background: "variant-filled-error",
      });
    }
  };
</script>

<div class="w-full">
  <div class={`${adding || editing ? "flex" : "hidden"} flex-col card `}>
    <header class="card-header">
      <label for="title" class="label">{l("Название")}</label>
      <input
        type="text"
        name="title"
        id="title"
        bind:value={form.title}
        class="input"
        placeholder={l("Название")}
      />
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
                }}>{l("Удалить")}</button
              >
            </span>
            <span>
              <DownloadButton
                href={`${$page.url.pathname}/documents/${encodeURIComponent(fileName)}`}
              ></DownloadButton>
            </span>
          </li>
        {/each}
      </ul>
      <label for="file" class="label">{l("Выберите файл")}</label>
      <input type="file" name="file" bind:files multiple={true} class="input" />

      <label for="description" class="label" placeholder={l("Описание")}>{l("Описание")}</label>
      <textarea
        name="description"
        id="description"
        class="textarea p-2"
        placeholder={l("Описание")}
        bind:value={form.description}
      />

      <label for="date" class="label"><span>{l("Дата окончания")} </span> </label>
      <input type="date" name="date" id="date" bind:value={form.date} class="input" required />
    </div>
    <footer class="card-footer">
      <button class="btn variant-filled-secondary" on:click={submit}>{l("Загрузить")}</button>
    </footer>
  </div>

  <div class={`${adding || editing ? "hidden" : "flex"} flex-col p-4 gap-4 w-full`}>
    <div>
      <AddButton
        on:click={() => {
          adding = !adding;
        }}>{l("Добавить контракт")}</AddButton
      >
    </div>

    {#each data.contractsNotifications as contractsNotifications}
      <div class="card w-full">
        <header class="card-header overflow-hidden">
          <h2 class="card-header-title text-pretty">
            {contractsNotifications.title}
          </h2>
        </header>
        <div class="p-2 md:p-6 gap-2 md:gap-6 flex flex-col w-full">
          <div class="p-4 card w-full">
            <h2>{l("Документ")}:</h2>
            {#each contractsNotifications.fileNames as fileName}
              <div class="p-4 text-pretty">
                <p class="text-wrap overflow-hidden">
                  {fileName?.split("/")[2] || fileName}
                </p>
                <div class="flex flex-wrap gap-5">
                  <DeleteButton
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
                      ).catch((e) => {
                        toastStore.trigger({
                          message: l("Ошибка при удалении файла"),
                          background: "variant-filled-error",
                        });
                        throw e;
                      });
                      const data = await res.json().catch((e) => {
                        toastStore.trigger({
                          message: l("Ошибка при удалении файла"),
                          background: "variant-filled-error",
                        });
                        throw e;
                      });
                      if (data.status === "ok") {
                        invalidateAll();
                      } else {
                        toastStore.trigger({
                          message: l("Ошибка при удалении файла"),
                          background: "variant-filled-error",
                        });
                      }
                    }}
                  ></DeleteButton>

                  <DownloadButton
                    href={`${$page.url.pathname}/documents/${encodeURIComponent(fileName)}`}
                  >
                    {l("Скачать")}
                  </DownloadButton>
                </div>
              </div>
            {/each}
          </div>
          <div class="p-4 card w-full">
            <h2>{l("Описание")}:</h2>
            {contractsNotifications.description}
          </div>
        </div>
        <footer class="flex flex-wrap gap-5 card-footer">
          <EditButton
            on:click={() => {
              editing = !editing;
              form = contractsNotifications;
            }}
          ></EditButton>
          <DeleteButton
            on:click={async () => {
              const res = await fetch(
                $page.url.pathname + "/contracts-notifications/" + contractsNotifications.id,
                {
                  method: "DELETE",
                },
              ).catch((e) => {
                toastStore.trigger({
                  message: l("Ошибка при удалении контракта"),
                  background: "variant-filled-error",
                });
                throw e;
              });
              const data = await res.json().catch((e) => {
                toastStore.trigger({
                  message: l("Ошибка при удалении контракта"),
                  background: "variant-filled-error",
                });
                throw e;
              });
              if (data.status === "ok") {
                invalidateAll();
              } else {
                toastStore.trigger({
                  message: l("Ошибка при удалении контракта"),
                  background: "variant-filled-error",
                });
              }
            }}
          ></DeleteButton>
        </footer>
      </div>
    {/each}
  </div>
</div>
