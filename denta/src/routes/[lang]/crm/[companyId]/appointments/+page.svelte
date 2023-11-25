<script lang="ts">
  import { page } from "$app/stores";
  import moment from "moment";

  import Section from "$lib/components/Section.svelte";
  import type { Appointment, Cabinet, Client, Company, Doctor } from "$lib/types/crm";
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

  console.log(data.company.workingHours.startAt);
</script>

<div class="flex flex-col items-start p-10">
  <button
    on:click={async () => {
      const res = await fetch(`/ru/crm/${companyId}/appointments/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "", contacts: [] }),
      });
      const _data = await res.json();
      console.log(_data);
    }}
  >
    Добавить встречу
  </button>
  {#each data.appointments as appointment}
    <Section>
      <h3>Клиент</h3>
      <select
        bind:value={appointment.clientId}
        on:change={(e) => {
          appointment.clientId = e.target.value;
        }}
      >
        {#each data.clients as client}
          <option value={client.id}>{client.name}</option>
        {/each}
      </select>
    </Section>

    <Section>
      <h3>Доктор</h3>
      <select
        bind:value={appointment.doctorId}
        on:change={(e) => {
          appointment.doctorId = e.target.value;
        }}
      >
        {#each data.employees as doctor}
          <option value={doctor.id}>{doctor.name}</option>
        {/each}
      </select>
    </Section>

    <Section>
      <h3>Кабинет</h3>
      <select
        bind:value={appointment.cabinetId}
        on:change={(e) => {
          appointment.cabinetId = e.target.value;
        }}
      >
        {#each data.cabinets as cabinet}
          <option value={cabinet.id}>{cabinet.name}</option>
        {/each}
      </select>
    </Section>

    <Section>
      <h3>Дата</h3>
      <div class="flex justify-between items-center">
        <h4>Начало:</h4>
        <input
          type="datetime-local"
          bind:value={appointment.startAt}
          on:input={(e) => {
            appointment.startAt = e.target.value;
          }}
        />
      </div>

      <div class="flex justify-between items-center">
        <h4>Продолжительность</h4>
        {Math.floor(durationSession / 60)} ч.
        {durationSession % 60} м.
        <button
          on:click={() => {
            const date = moment(appointment.endAt);
            date.add(step / 2, "m");
            durationSession += step / 2;
            appointment.endAt = date.format("YYYY-MM-DDTHH:mm:ss");
          }}>+{step / 2}</button
        >
        <button
          on:click={() => {
            const date = moment(appointment.endAt);
            date.add(-step / 2, "m");
            durationSession -= step / 2;
            appointment.endAt = date.format("YYYY-MM-DDTHH:mm:ss");
          }}>-{step / 2}</button
        >
      </div>

      <div class="flex justify-between items-center">
        <h4>Конец:</h4>
        <input
          type="datetime-local"
          bind:value={appointment.endAt}
          on:input={(e) => {
            appointment.endAt = e.target.value;
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
              {moment(appointment.startAt).get('hours') * 60 +
                      moment(appointment.startAt).get('minutes') ===
                      i * 60 + k * step &&
                    moment(appointment.startAt).get('D') === moment().get('D') + j + 1
                      ? 'bg-green-300 text-white'
                      : ''}  

                    {moment(appointment.startAt).get('hours') * 60 +
                      moment(appointment.startAt).get('minutes') <
                      i * 60 + k * step &&
                    moment(appointment.startAt).get('D') === moment().get('D') + j + 1 &&
                    moment(appointment.endAt).get('hours') * 60 +
                      moment(appointment.endAt).get('minutes') >
                      i * 60 + k * step &&
                    moment(appointment.endAt).get('D') === moment().get('D') + j + 1
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
                      appointment.startAt = date.format("YYYY-MM-DDTHH:mm:ss");

                      date.add(durationSession, "m");
                      appointment.endAt = date.format("YYYY-MM-DDTHH:mm:ss");
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

    <button
      on:click={async () => {
        const res = await fetch(`/ru/crm/${companyId}/appointments/api/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: appointment.id,
          }),
        });
        const _data = await res.json();
        console.log(_data);
      }}
      class="bg-teal-500 p-2 rounded-xl"
    >
      Сохранить изменения
    </button>
  {/each}
</div>
