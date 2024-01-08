<script lang="ts">
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import Crafts from "$lib/assets/crafts-simbol/crafts.webp";
  import Crafts2048 from "$lib/assets/crafts-simbol/crafts-2048.webp";
  import Crafts1024 from "$lib/assets/crafts-simbol/crafts-1024.webp";
  import Crafts512 from "$lib/assets/crafts-simbol/crafts-512.webp";
  import Crafts256 from "$lib/assets/crafts-simbol/crafts-256.webp";
  import SvelteSeo from "svelte-seo";
</script>

<SvelteSeo
  title="roll-over.crafts - Заказная разработка"
  description="Заказная разработка сайтов и web-приложений, дизайн, SEO-оптимизация, развёртывание и поддержка."
  canonical="https://roll-over.org/projects/crafts"
></SvelteSeo>

<CenteredPage>
  <div class="sm:relative">
    <h1 class="sm:absolute p-5 sm:min-w-full header">roll-over.crafts - Заказная разработка</h1>
    <img
      src={Crafts}
      srcset={`${Crafts256} 256w, ${Crafts512} 512w, ${Crafts1024} 1024w, ${Crafts2048} 2048w`}
      sizes="(max-width: 1024px) 100vw, 1024px"
      alt="crafts"
      class="rounded-xl"
    />
  </div>

  <section>
    <h2>Чем мы можем помочь?</h2>
    <ul class="list list-disc pl-2 md:pl-5">
      <li>Отговорить вас от реализации (скорее всего оно вам не нужно)</li>
      <li>Разработка сайтов под решение ваших задач</li>
      <li>Дизайн с необходимой детализацией</li>
      <li>Базовая SEO-оптимизация</li>
      <li>Развёртывание и поддержка ваших сайтов</li>
    </ul>
  </section>

  <section>
    <h2>Стек</h2>
    <p>
      Мы беремся за проекты только на узком стеке для веб приложений, чтобы не тратить время на
      изучение новых технологий и сконцентрироваться на решении задач.
    </p>
    <p>
      Мы используем <a href="https://kit.svelte.dev/?utm_source=roll-over.org"> SvelteKit</a>,
      <a href="https://tailwindcss.com/?utm_source=roll-over.org">Tailwind</a> и в исключительных
      случаях делаем модули на
      <a href="https://www.python.org/?utm_source=roll-over.org">Python</a>.
    </p>
  </section>

  <section>
    <h2>Контакты</h2>
    <ul class="list list-disc pl-2 md:pl-5">
      <li>
        <a href="https://t.me/orby_tech">https://t.me/orby_tech</a>
      </li>
      <li>
        <a href="mailto:crafts@roll-over.org"> crafts@roll-over.org </a>
      </li>
      <li>
        <a href="https://discord.gg/rFEx2WHdFg">https://discord.gg/rFEx2WHdFg</a>
      </li>
    </ul>
  </section>
</CenteredPage>

<style>
  @media screen and (min-width: 640px) {
    .header {
      background-color: rgba(38, 169, 38, 0.162);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(13, 76, 2, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(68, 196, 21, 0.3);
    }
  }
</style>
