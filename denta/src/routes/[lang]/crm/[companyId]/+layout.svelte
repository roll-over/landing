<script lang="ts">
  import type { Company } from "$lib/types/crm";

  export let data: {
    company: Company;
  };

  $: id = data.company.id;
</script>

<div class="flex flex-row">
  <nav>
    <ol>
      <li>
        <a href={`/ru/crm/${id}/company`}>Компания</a>
      </li>
      <li>
        <a href={`/ru/crm/${id}/clients`}>Клиенты</a>
      </li>
      <li>
        <a href={`/ru/crm/${id}/appointments`}>Записи</a>
      </li>
      <li>
        <a href={`/ru/crm/${id}/price-list`}>Прайс лист</a>
      </li>
      <li>
        <a href={`/ru/crm/${id}/employees`}>Доктора</a>
      </li>
      <li>
        <a href={`/ru/crm/${id}/cabinets`}>Кабинеты</a>
      </li>
      <li>
        <a href={`/ru/crm/${id}/reports`}>Отчеты</a>
      </li>
    </ol>
  </nav>

  <slot />
</div>
