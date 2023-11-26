<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import AddButton from "$lib/components/AddButton.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { Company } from "$lib/types/crm";
  export let data: { company: Company };

  const companyId = $page.params.companyId;
</script>

<CenteredPage>
  <Section>
    <h3>Название</h3>
    <input
      type="text"
      bind:value={data.company.name}
      on:input={(e) => {
        data.company.name = e.target.value;
      }}
    />
  </Section>
  <Section>
    <h3>Владелец</h3>
    <p>
      {data.company.owner}
    </p>
  </Section>
  <Section>
    <h3>Дата создания</h3>
    <p>
      {new Date(data.company.createdAt).toLocaleString()}
    </p>
  </Section>

  <Section>
    <h3>Контакты</h3>

    {#if !data.company?.contacts?.length}
      <p>Нет контактов</p>
    {:else}
      <ul>
        {#each data.company.contacts || [] as contact}
          <li>
            <select
              bind:value={contact.type}
              on:change={(e) => {
                contact.type = e.target.value;
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
        data.company.contacts = [...(data.company.contacts || []), { type: "phone", value: "" }];
      }}
    >
      Добавить контакт
    </AddButton>
  </Section>

  <Section>
    <h3>Рабочие часы</h3>
    <h4>Начало</h4>
    <input
      type="time"
      bind:value={data.company.workingHours.startAt}
      on:input={(e) => {
        data.company.workingHours.startAt = e.target.value;
      }}
    />

    <h4>Конец</h4>
    <input
      type="time"
      bind:value={data.company.workingHours.endAt}
      on:input={(e) => {
        data.company.workingHours.endAt = e.target.value;
      }}
    />

    <h4>Step</h4>
    <select
      bind:value={data.company.workingHours.step}
      on:change={(e) => {
        data.company.workingHours.step = e.target.value;
      }}
    >
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="60">60</option>
    </select>
  </Section>

  <SaveButton
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/company/api/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.company.name,
          contacts: data.company.contacts || [],
          workingHours: data.company.workingHours,
        }),
      });

      window.location.reload();
    }}
  >
    Сохранить изменения
  </SaveButton>
  <br />
  <DeleteButton
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/company/api/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: { name } }),
      });

      goto(`/ru/crm/`);
    }}
  >
    Удалить компанию
  </DeleteButton>
</CenteredPage>
