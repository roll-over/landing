<script lang="ts">
  import { page } from "$app/stores";
  import moment from "moment";

  import Section from "$lib/components/Section.svelte";
  import type { Appointment, Cabinet, Client, Company, Doctor } from "$lib/types/crm";
  import AddButton from "$lib/components/AddButton.svelte";
  import SaveButton from "$lib/components/SaveButton.svelte";
  import EditButton from "$lib/components/EditButton.svelte";
  import SupportLink from "$lib/components/SupportLink.svelte";
  export let data: {
    appointments: Appointment[];
    clients: Client[];
    employees: Doctor[];
    cabinets: Cabinet[];
    company: Company;
  };
  $: companyId = $page.params.companyId;
  $: durationSession = 60;
  $: step = data.company.workingHours.step;
  $: startShift = data.company.workingHours.startAt
    ? (+data.company.workingHours.startAt.split(":")[0] * 60 +
        +data.company.workingHours.startAt.split(":")[1]) /
      60
    : 0;
  $: startShiftHours = Math.ceil(startShift);

  $: endShift = data.company.workingHours.endAt
    ? (+data.company.workingHours.endAt.split(":")[0] * 60 +
        +data.company.workingHours.endAt.split(":")[1]) /
      60
    : 0;
  $: endShiftHours = Math.floor(endShift);

  $: appointmentInEditId = "";
  $: appointmentInEdit = data.appointments.find((a) => a.id === appointmentInEditId);
</script>

<div class="flex flex-col items-start p-10">
  <AddButton
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/appointments/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "", contacts: [] }),
      });

      window.location.reload();
    }}
  />
  {#if appointmentInEdit}
    <Section>
      <h3>Клиент</h3>
      <select
        bind:value={appointmentInEdit.clientId}
        on:change={(e) => {
          appointmentInEdit.clientId = e.target.value;
        }}
      >
        {#each data.clients as client}
          <option value={client.id}>{client.name}</option>
        {/each}
      </select>
      <SupportLink href="/ru/crm/{companyId}/clients">Добавить клиента</SupportLink>
    </Section>

    <Section>
      <h3>Доктор</h3>
      <select
        bind:value={appointmentInEdit.doctorId}
        on:change={(e) => {
          appointmentInEdit.doctorId = e.target.value;
        }}
      >
        {#each data.employees as doctor}
          <option value={doctor.id}>{doctor.name}</option>
        {/each}
      </select>
      <SupportLink href="/ru/crm/{companyId}/employees">Добавить доктора</SupportLink>
    </Section>

    <Section>
      <h3>Кабинет</h3>
      <select
        bind:value={appointmentInEdit.cabinetId}
        on:change={(e) => {
          appointmentInEdit.cabinetId = e.target.value;
        }}
      >
        {#each data.cabinets as cabinet}
          <option value={cabinet.id}>{cabinet.name}</option>
        {/each}
      </select>
      <SupportLink href="/ru/crm/{companyId}/cabinets">Добавить кабинет</SupportLink>
    </Section>

    <Section>
      <h3>Дата</h3>
      <div class="flex justify-between items-center">
        <h4>Начало:</h4>
        <input
          type="datetime-local"
          bind:value={appointmentInEdit.startAt}
          on:input={(e) => {
            appointmentInEdit.startAt = e.target.value;
          }}
        />
      </div>

      <div class="flex justify-between items-center">
        <h4>Продолжительность</h4>
        {Math.floor(durationSession / 60)} ч.
        {durationSession % 60} м.
        <button
          on:click={() => {
            const date = moment(appointmentInEdit.endAt);
            date.add(step, "m");
            durationSession += step;
            appointmentInEdit.endAt = date.format("YYYY-MM-DDTHH:mm:ss");
          }}>+{step}</button
        >
        <button
          on:click={() => {
            const date = moment(appointmentInEdit.endAt);
            date.add(-step, "m");
            durationSession -= step;
            appointmentInEdit.endAt = date.format("YYYY-MM-DDTHH:mm:ss");
          }}>-{step}</button
        >
      </div>

      <div class="flex justify-between items-center">
        <h4>Конец:</h4>
        <input
          type="datetime-local"
          bind:value={appointmentInEdit.endAt}
          on:input={(e) => {
            appointmentInEdit.endAt = e.target.value;
          }}
        />
      </div>

      <div class="grid grid-cols-8 grid-rows-26">
        {#each Array.from({ length: 8 }) as _, i}
          <p>
            {#if i !== 0}
              {moment().add(i, "d").format("DD.MM")}
            {/if}
          </p>
        {/each}

        {#each Array.from({ length: 24 }) as _, i}
          {#if startShiftHours < i && endShiftHours > i}
            <p>
              {i}:00
            </p>
            {#each Array.from({ length: 7 }) as _, j}
              <div class="grid grid-cols-1 grid-rows-{60 / step}">
                {#each Array.from({ length: 60 / step }) as _, k}
                  <button
                    class="border border-gray-300 px-2 hover:bg-gray-600 hover:text-white {moment().get(
                      'hours',
                    ) ===
                      i + (k * step) / 60 && 0 === j
                      ? 'bg-red-400 text-white'
                      : ''}
              {moment().get('hours') > i + (k * step) / 60 && 0 === j
                      ? 'bg-red-300 text-white'
                      : ''}  
              {moment(appointmentInEdit.startAt).get('hours') * 60 +
                      moment(appointmentInEdit.startAt).get('minutes') ===
                      i * 60 + k * step &&
                    moment(appointmentInEdit.startAt).get('D') === moment().get('D') + j + 1
                      ? 'bg-green-300 text-white'
                      : ''}  

                    {moment(appointmentInEdit.startAt).get('hours') * 60 +
                      moment(appointmentInEdit.startAt).get('minutes') <
                      i * 60 + k * step &&
                    moment(appointmentInEdit.startAt).get('D') === moment().get('D') + j + 1 &&
                    moment(appointmentInEdit.endAt).get('hours') * 60 +
                      moment(appointmentInEdit.endAt).get('minutes') >
                      i * 60 + k * step &&
                    moment(appointmentInEdit.endAt).get('D') === moment().get('D') + j + 1
                      ? 'bg-green-300 text-white'
                      : ''}
              
              "
                    on:click={() => {
                      const date = moment();
                      date.add(i - date.get("hours"), "hours");
                      date.add(j + 1, "d");

                      date.set("minutes", k * step);
                      date.set("seconds", 0);
                      console.log(moment(date.format("YYYY-MM-DDTHH:mm:ss")).toISOString());
                      appointmentInEdit.startAt = date.format("YYYY-MM-DDTHH:mm:ss");

                      date.add(durationSession, "m");
                      appointmentInEdit.endAt = date.format("YYYY-MM-DDTHH:mm:ss");
                    }}
                  >
                  </button>
                {/each}
              </div>
            {/each}
          {/if}
        {/each}
      </div>
    </Section>
    <SaveButton
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/appointments/api/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: appointmentInEdit.id,
            clientId: appointmentInEdit.clientId,
            doctorId: appointmentInEdit.doctorId,
            cabinetId: appointmentInEdit.cabinetId,
            startAt: appointmentInEdit.startAt,
            endAt: appointmentInEdit.endAt,
          }),
        });
        window.location.reload();
      }}
    >
      Сохранить изменения
    </SaveButton>
  {:else}
    <div>
      <div class="hidden lg:grid grid-cols-6 gap-5 appointments-table">
        <p>Клиент</p>
        <p>Доктор</p>
        <p>Кабинет</p>
        <p>Время</p>
        <p>Дата</p>
        <p>Редактировать</p>
      </div>
      <div class="flex flex-row flex-wrap gap-16 w-full justify-start">
        {#each data.appointments as appointment}
          <div
            class="grid grid-cols-1 lg:grid-cols-6 p-5 gap-5 appointments-table border-2 border-grey-700 min-w-[30%] lg:w-full"
          >
            <p class={appointment.clientId ? "" : "bg-red-200"}>
              {appointment.clientId
                ? data.clients.find((c) => c.id === appointment.clientId)?.name
                : "NaN"}
            </p>
            <p class={appointment.doctorId ? "" : "bg-red-200"}>
              {appointment.doctorId
                ? data.employees.find((e) => e.id === appointment.doctorId)?.name
                : "NaN"}
            </p>
            <p class={appointment.cabinetId ? "" : "bg-red-200"}>
              {appointment.cabinetId
                ? data.cabinets.find((c) => c.id === appointment.cabinetId)?.name
                : "NaN"}
            </p>
            <p class={appointment.startAt ? "" : "bg-red-200"}>
              {appointment.startAt ? moment(appointment.startAt).format("HH:mm") : "NaN"}
              -
              {appointment.endAt ? moment(appointment.endAt).format("HH:mm ") : "NaN"}
            </p>
            <p>
              {moment(appointment.startAt || appointment.endAt).format("DD.MM")}
            </p>
            <EditButton
              on:click={() => {
                appointmentInEditId = appointment.id;
              }}
            >
              Редактировать
            </EditButton>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .appointments-table > * {
    padding: 10px;
  }
</style>
