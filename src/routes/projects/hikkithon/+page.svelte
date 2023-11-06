<script>
  import ProjectTitle from "$lib/components/ProjectTitle.svelte";
  import WhatIsProject from "$lib/components/WhatIsProject.svelte";
  import Link from "$lib/components/Link.svelte";
  import ProjectTemplate from "$lib/components/ProjectTemplate.svelte";
  import { vacancies } from "$lib/vacancies.js";
  import { projects, Status } from "$lib/projects";
</script>

<ProjectTemplate title="HikkiThon">
  <WhatIsProject title="HikkiThon">
    <p>
      Свободный, ежемесячный онлайн хакатон, где участники создают проекты, которые помогут людям
      жить лучше.
    </p>
  </WhatIsProject>
  <section>
    <h2>25-26 ноября 2023</h2>
    <p>
      Уже в этом году мы проведем первый хакатон, на котором участники смогут создать проекты,
      получить поддержку менторов и найти новых друзей.
    </p>
    <p>
      30 часов чистого кода, дизайна и идей. 30 часов, чтобы создать проект, которым можно будет
      гордиться.
    </p>
  </section>
  <section>
    <h2>Миссия</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>Популяризация свободного исходного кода</li>
      <li>Создание открытой площадки безопасных и регулярных соревнований в создании продуктов</li>
      <li>Сделать кооперацию повседневным инструментом</li>
    </ul>
  </section>
  <section>
    <h2>Участие</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <p>Место проведения:</p>
        <Link href="https://discord.gg/KdC4u4WqQZ">Сервер дискорд</Link>
      </li>
    </ul>
  </section>
  <section>
    <h2>Связаться</h2>
    <ul class="list-disc pl-10 grid grid-col gap-2">
      <li>
        <a href="mailto:roll.over.projects@gmail.com">roll.over.projects@gmail.com </a>
      </li>
    </ul>
  </section>
</ProjectTemplate>
