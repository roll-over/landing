<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import type { Company } from "$lib/types/crm";
  import Dantist1 from "$lib/assets/crm-pictures/0_3.webp";
  import Dantist2 from "$lib/assets/crm-pictures/0_2.webp";
  import Dantist3 from "$lib/assets/crm-pictures/0_0.webp";
  import Divider from "$lib/components/Divider.svelte";

  export let data: { company: Company; companies: Company[] };
</script>

<svelte:head>
  <title>CRM-система для стоматологий</title>
  <meta name="description" content="CRM-система для стоматологий" />
</svelte:head>

<div class="flex flex-col p-2 md:p-10 w-full gap-5 md:gap-10">
  <h1>CRM-система для стоматологий</h1>
  <Section>
    <div class="w-full flex justify-center">
      <div class="flex flex-col gap-5 w-96">
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
      </div>
    </div>
  </Section>

  <Section>
    <div class="flex gap-5 justify-center items-center flex-col-reverse md:flex-row">
      <img src={Dantist1} class="w-96 h-96 rounded-xl" alt="Стоматолог в кресле" />
      <div class="flex flex-col md:p-10 gap-5 md:gap-10 justify-center text-block">
        <h2>Беспланая CRM-система для стоматологов и стоматолгических клиник</h2>
        <p>
          Попробуйте бесплатно создать компанию, это займет до 10 минут, и вы сможете управлять
          своей стоматологией без головной боли в ведении отчетности.
        </p>
        <p>А ещё, мы займемся продвижением вашей стоматологии в поиске.</p>
        {#if !data.companies?.length}
          <a href="/ru/crm/create-company" class="btn variant-filled-primary">
            Создать компанию!
          </a>
        {/if}
      </div>
    </div>
  </Section>
  <Divider y={true} />
  <Section>
    <div class="flex gap-5 justify-center items-center flex-col md:flex-row">
      <div class="flex flex-col md:p-10 gap-5 md:gap-10 justify-center text-block">
        <h2>Создание своего личного сайта для стоматологии - это просто.</h2>
        <p>
          Вам не нужно ничего знать в прогаммировании и дизайне. Все что вам нужно - это
          зарегистрироваться в нашей системе и заполнить несколько полей.
        </p>
        <p>
          После этого вы получите свой личный сайт, который будет отображаться в поиске и привлекать
          клиентов.
        </p>
        {#if !data.companies?.length}
          <a href="/ru/crm/create-company" class="btn variant-filled-primary">
            Создать компанию!
          </a>
        {/if}
      </div>
      <img src={Dantist2} class="w-96 h-96 rounded-xl" alt="Стоматолог за компьютером" />
    </div>
  </Section>

  <Divider y={true} />

  <Section>
    <div class="flex gap-5 justify-center items-center flex-col-reverse md:flex-row">
      <img src={Dantist3} class="w-96 h-80 rounded-xl" alt="Стоматолог за компьютером" />
      <div class="flex flex-col md:p-10 gap-5 md:gap-10 justify-center text-block">
        <h2>Почему наша CRM для стоматологов бесплатна?</h2>
        <p>
          Это абсолютно правильное переживание за безопасность использования бесплатной системы, и
          сейчас мы объясним почему наша система и бесплатна и безопасна.
        </p>
        <ol class="list pl-2">
          <li>
            <span>1.</span>
            <span>
              Мы берем коммиссию с каждого клиента, который записывается к вам через нашу систему.
            </span>
          </li>
          <li>
            <span>2.</span>
            <span>
              У нас есть дополнительные платные услуги и сервисы, которые вы можете заказать, если
              вам будет нужно
            </span>
          </li>
          <li>
            <span>3.</span>
            <span>
              Мы помогаем вам продвигать вашу стоматологию в поиске, и вы можете заказать у нас
              услуги консультаций по продвижению или вообще отдать нам это дело.
            </span>
          </li>
          <li class="contents">
            <span>4.</span>
            <span>
              Весь <a href="https://github.com/roll-over/landing" class="text-sm underline-offset-1"> код нашей системы открыт</a>, и
              вы можете убедиться в том, что она действительно безопасна и мы опираемся на поддержку
              сообщества, что снижает стоимость разработки.
            </span>
          </li>
        </ol>
        {#if !data.companies?.length}
          <a href="/ru/crm/create-company" class="btn variant-filled-primary">
            Создать компанию!
          </a>
        {/if}
      </div>
    </div>
  </Section>
</div>

<style>
  .contents {
    display: contents;
  }

  .text-block {
    max-width: 600px;
  }
</style>
