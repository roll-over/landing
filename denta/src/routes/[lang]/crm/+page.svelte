<script lang="ts">
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { Company } from "$lib/types/crm";
  export let data: { company: Company; companies: Company[] };
</script>

<svelte:head>
  <title>CRM-система для стоматологий</title>
  <meta name="description" content="CRM-система для стоматологий" />
</svelte:head>

<CenteredPage>
  <h1>CRM-система для стоматологий</h1>
  <Section>
    <h2>Ваши компании</h2>
    {#if !data.companies?.length}
      <p>Ой, кажется у вас до сих пор не создана компания</p>
    {:else}
      <ol class="flex flex-col gap-10">
        {#each data.companies as company}
          <li>
            <a
              class="border-2 border-gray-400 rounded-xl px-5 py-2"
              href={`/ru/crm/${company.id}/company`}>{company.name} -></a
            >
          </li>
        {/each}
      </ol>
    {/if}
    <a href="/ru/crm/create-company" class="btn variant-filled-primary"> Создать компанию! </a>
  </Section>

  <Section>
    <h2>Беспланая CRM-система для стоматологов и стоматолгических клиник</h2>
    <p>
      Попробуйте бесплатно создать компанию, это займет до 10 минут, и вы сможете управлять своей
      стоматологией без головной боли в ведении отчетности.
    </p>
    <p>А ещё, мы займемся продвижением вашей стоматологии в поиске.</p>
  </Section>

  <Section>
    <h2>Создание своего личного сайта для стоматологии - это просто.</h2>
    <p>
      Вам не нужно ничего знать в прогаммировании и дизайне. Все что вам нужно - это
      зарегистрироваться в нашей системе и заполнить несколько полей.
    </p>
    <p>
      После этого вы получите свой личный сайт, который будет отображаться в поиске и привлекать
      клиентов.
    </p>
    <a href="/ru/crm/create-company" class="btn variant-filled-primary"> Создать компанию! </a>
  </Section>

  <Section>
    <h2>Почему наша CRM для стоматологов бесплатна?</h2>
    <p>
      Это абсолютно правильное переживание за безопасность использования бесплатной системы, и
      сейчас мы объясним почему наша система и бесплатна и безопасна.
    </p>
    <ul class="list list-disc pl-10">
      <li>Мы берем коммиссию с каждого клиента, который записывается к вам через нашу систему.</li>
      <li>
        У нас есть дополнительные платные услуги и сервисы, которые вы можете заказать, если вам
        будет нужно
      </li>
      <li>
        Мы помогаем вам продвигать вашу стоматологию в поиске, и вы можете заказать у нас услуги
        консультаций по продвижению или вообще отдать нам это дело.
      </li>
      <li class="contents">
        Весь <a href="https://github.com/roll-over/landing"> код нашей системы открыт</a>, и вы
        можете убедиться в том, что она действительно безопасна и мы опираемся на поддержку
        сообщества, что снижает стоимость разработки.
      </li>
    </ul>
    <a href="/ru/crm/create-company" class="btn variant-filled-primary"> Создать компанию! </a>
  </Section>
</CenteredPage>

<style>
  .contents {
    display: contents;
  }
</style>
