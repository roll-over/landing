<script lang="ts">
  import { invalidateAll } from "$app/navigation";
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
      notifications: {
        daysBefore: number;
        status: string;
      }[];
    }[];
  };

  $: form = {
    id: "",
    fileNames: [] as string[],
    description: "",
    date: "",
    title: "",
    notifications: [] as
      | {
          daysBefore: number;
          status: string;
        }[]
      | undefined,
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

    if (files) {
      for (const _file of files) {
        if (_file) {
          _files.push(_file);
        }
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
        ...form,
        fileNames: [...(newFileNames || []), ...(form?.fileNames || [])],
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
        notifications: [],
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
  <div class={`${adding || editing ? "flex" : "hidden"} card flex-col `}>
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
    <div class="card flex flex-col gap-2 p-2 md:gap-4 md:p-4">
      <ul class="list">
        {#each form.fileNames as fileName, i}
          <li class="flex flex-wrap">
            <span>{i + 1}. </span>
            <span>
              {fileName}
            </span>
            <span>
              <DeleteButton
                on:click={() => {
                  form.fileNames = form.fileNames.filter((f) => f !== fileName);
                }}
              ></DeleteButton>
            </span>
            <span>
              <DownloadButton
                href={`${$page.url.pathname}/documents/${encodeURIComponent(fileName)}`}
              >
                {l("Скачать")}
              </DownloadButton>
            </span>
          </li>
        {/each}
      </ul>
      <div class="card p-2 md:p-4">
        <label for="file" class="label">{l("Выберите файл")}</label>
        <input type="file" name="file" bind:files multiple={true} class="input" />
      </div>
      <div class="card p-2 md:p-4">
        <label for="description" class="label" placeholder={l("Описание")}>{l("Описание")}</label>
        <textarea
          name="description"
          id="description"
          class="textarea p-2"
          placeholder={l("Описание")}
          bind:value={form.description}
        />
      </div>

      <div class="card p-2 md:p-4">
        <label for="date" class="label"><span>{l("Дата окончания")} </span> </label>
        <input type="date" name="date" id="date" bind:value={form.date} class="input" required />
      </div>

      <div class="card flex flex-col gap-2 p-2 md:gap-4 md:p-4">
        <h3>
          {l("Уведомления")}:
        </h3>
        {#each form.notifications || [] as notification, i}
          <div class="card flex flex-wrap gap-5 p-2 md:p-4">
            <label for="daysBefore" class="label">{l("За сколько дней")}</label>
            <input
              type="number"
              name="daysBefore"
              id="daysBefore"
              bind:value={notification.daysBefore}
              class="input"
              placeholder={l("За сколько дней")}
            />
            <label for="status" class="label">{l("Статус уведомления")}</label>
            <select name="status" id="status" bind:value={notification.status} class="input">
              <option value="wait">{l("Ожидается")}</option>
              <option value="inactive" disabled>{l("Неактивно")}</option>
            </select>
            <DeleteButton
              on:click={() => {
                form.notifications = form.notifications?.filter((n) => n !== notification) || [];
              }}>{l("Удалить")}</DeleteButton
            >
          </div>
        {/each}
        <AddButton
          on:click={() => {
            form.notifications = [
              ...(form.notifications || []),
              {
                daysBefore: 3,
                status:
                  (new Date(form.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) > 3
                    ? "waiting"
                    : "inactive",
              },
            ];
          }}>{l("Добавить уведомление")}</AddButton
        >
      </div>
    </div>
    <footer class="card-footer">
      <button class="variant-filled-secondary btn" on:click={submit}
        >{l("Сохранить изменения")}</button
      >
    </footer>
  </div>

  <div class={`${adding || editing ? "hidden" : "flex"} w-full flex-col gap-4 p-4`}>
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
        <div class="flex w-full flex-col gap-2 p-2 md:gap-6 md:p-6">
          <div class="card w-full p-4">
            <h2>{l("Документы")}:</h2>
            {#each contractsNotifications.fileNames as fileName}
              <div class="text-pretty p-4">
                <p class="text-wrap overflow-hidden">
                  {fileName?.split("/")[2] || fileName}
                </p>
                <div class="flex flex-wrap justify-end gap-5">
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
          {#if contractsNotifications.date}
            <div class="card w-full p-4">
              <h2>{l("Дата окончания")}:</h2>
              {contractsNotifications.date}
              <span>
                ({new Date(contractsNotifications.date) < new Date() ? l("Истек") : l("Действует")})
              </span>
              <div>
                <span>
                  {l("Дней до окончания")}:
                </span>
                <span>
                  {Math.floor(
                    (new Date(contractsNotifications.date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </span>
              </div>
            </div>
          {/if}
          {#if contractsNotifications.description}
            <div class="card w-full p-4">
              <h2>{l("Описание")}:</h2>
              {contractsNotifications.description}
            </div>
          {/if}

          {#if contractsNotifications.notifications}
            <div class="card list w-full p-4">
              <h2>{l("Уведомления")}:</h2>
              {#each contractsNotifications.notifications as notification, i}
                <div class="flex flex-wrap gap-5">
                  <span>
                    {i + 1}.
                  </span>
                  <span>
                    <span>{l("За сколько дней")}:</span>
                    <span>{notification.daysBefore}</span>
                    {#if notification.status === "waiting"}
                      <span class="text-green-500">{notification.status}</span>
                    {:else if notification.status === "inactive"}
                      <span class="text-red-500">{notification.status}</span>
                    {:else if notification.status === "done"}
                      <span class="text-blue-500">{notification.status}</span>
                    {:else if notification.status === "error"}
                      <span class="text-red-500">{notification.status}</span>
                    {:else}
                      <span>{notification.status}</span>
                    {/if}
                  </span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
        <footer class="card-footer flex flex-wrap justify-end gap-5">
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
