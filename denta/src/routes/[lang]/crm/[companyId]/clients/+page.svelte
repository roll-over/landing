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

<div class="flex flex-col gap-10 md:p-10">
  <Section>
    <h2>Добавить карточку клиента</h2>

    <p>
      Вы можете добавить карточку клиента, чтобы в дальнейшем записывать его на приёмы и вести
      историю болезни.
    </p>

    <AddButton
      on:click={async () => {
        const res = await fetch(`/${$page.params.lang}/crm/${companyId}/clients/api/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "", contacts: [] }),
        });

        window.location.reload();
      }}
    />
  </Section>

  <div class="flex gap-10 flex-wrap">
    {#each data.clients as client}
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
        <section class="p-4">
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
          />
        </section>
        {#if client.changed}
          <SaveButton
            on:click={async () => {
              const res = await fetch(`/${$page.params.lang}/crm/${companyId}/clients/api/`, {
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
      </Section>
    {/each}
  </div>
</div>
