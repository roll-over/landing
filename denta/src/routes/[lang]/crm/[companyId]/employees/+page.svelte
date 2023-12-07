<script lang="ts">
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";

  import Section from "$lib/components/Section.svelte";
  import type { Doctor } from "$lib/types/crm";
  export let data: { employees: Doctor[] };
  $: companyId = $page.params.companyId;
</script>

<div class="flex flex-col flex-wrap gap-10 md:p-10">
  <Section>
    <h2>Добавить доктора</h2>
    <p>
      Вы можете добавить доктора, чтобы в дальнейшем записывать клиентов на приёмы.
    </p>
    <AddButton
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/employees/api/`, {
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
  <div class="flex flex-row flex-wrap gap-10">
    {#each data.employees as employee}
      <Section class="flex flex-col border-2 rounded-xl border-gray-300 p-5 w-full md:max-w-sm">
        <section>
          <h3>Имя</h3>

          <input
            type="text"
            bind:value={employee.name}
            on:input={(e) => {
              employee.name = e.target.value;
              employee.changed = true;
            }}
          />
        </section>

        <section>
          <h3>Контакты</h3>

          {#if !employee?.contacts?.length}
            <p>Нет контактов</p>
          {:else}
            <ul>
              {#each employee.contacts || [] as contact}
                <li>
                  <select
                    bind:value={contact.type}
                    on:change={(e) => {
                      contact.type = e.target.value;
                      employee.changed = true;
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
                    }}
                  />
                </li>
              {/each}
            </ul>
          {/if}
          <AddButton
            on:click={() => {
              employee.contacts = [...(employee.contacts || []), { type: "phone", value: "" }];
              employee.changed = true;
            }}
          />
        </section>
        {#if employee.changed}
          <SaveButton
            on:click={async () => {
              const res = await fetch(`/ru/crm/${companyId}/employees/api/`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: employee.name,
                  contacts: employee.contacts || [],
                  id: employee.id,
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
