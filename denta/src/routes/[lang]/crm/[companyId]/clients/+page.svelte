<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";

  import Section from "$lib/components/Section.svelte";
  import type { Client } from "$lib/types/crm";
  export let data: { clients: Client[] };
  $: companyId = $page.params.companyId;
</script>

<div class="flex flex-col gap-10">
  <div>
    <AddButton
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/clients/api/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "", contacts: [] }),
        });

        window.location.reload();
      }}
    >
      Добавить клиента
    </AddButton>
  </div>

  <div class="flex gap-10 flex-wrap">
    {#each data.clients as client}
      <div class="flex flex-col border-2 rounded-xl border-gray-400 p-5">
        <Section>
          <h3>Имя</h3>

          <input
            type="text"
            bind:value={client.name}
            on:input={(e) => {
              client.name = e.target.value;
              client.changed = true;
            }}
          />
        </Section>

        <Section>
          <h3>Контакты</h3>

          {#if !client?.contacts?.length}
            <p>Нет контактов</p>
          {:else}
            <ul>
              {#each client.contacts || [] as contact}
                <li>
                  <select
                    bind:value={contact.type}
                    on:change={(e) => {
                      contact.type = e.target.value;
                      client.changed = true;
                    }}
                  >
                    <option value="phone">Телефон</option>
                    <option value="email">Email</option>
                    <option value="telegram">Telegram</option>
                    <option value="vk">VK</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="viber">Viber</option>
                    <option value="wechat">WeChat</option>
                    <option value="skype">Skype</option>
                  </select>:
                  <input
                    type="text"
                    bind:value={contact.value}
                    on:input={(e) => {
                      contact.value = e.target.value;
                      client.changed = true;
                    }}
                  />
                </li>
              {/each}
            </ul>
          {/if}
          <AddButton
            on:click={() => {
              client.contacts = [...(client.contacts || []), { type: "phone", value: "" }];
              client.changed = true;
            }}
          >
            Добавить контакт
          </AddButton>
        </Section>
        {#if client.changed}
          <SaveButton
            on:click={async () => {
              const res = await fetch(`/ru/crm/${companyId}/clients/api/`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: client.name,
                  contacts: client.contacts || [],
                  id: client.id,
                }),
              });

              window.location.reload();
            }}
          >
            Сохранить изменения
          </SaveButton>
        {/if}
      </div>
    {/each}
  </div>
</div>
