<script lang="ts">
  export let anounce: any;
</script>

<a
  href={`/admin/anounces/${anounce.id}`}
  class="flex flex-col border-2 border-gray-400 p-2 rounded-xl"
  id={`anounce-id-${anounce.id}`}
>
  <h1 class={anounce.title ? "" : "text-red-500"}>Тема: {anounce.title}</h1>
  <p>
    Дата проведения: {anounce.date ? new Date(anounce.date).toLocaleString() : "Не указана дата"}
  </p>
  <p class={anounce.openMicType ? "" : "text-red-500"}>
    Тип: {anounce.openMicType}
  </p>
  <p
    class={anounce.status === "planing"
      ? "text-green-500"
      : anounce.status === "cancel"
      ? "text-yellow-400"
      : "text-red-500"}
  >
    Статус: {anounce.status}
  </p>
  <p class={anounce.speakerName ? "" : "text-red-500"}>
    Имя выступащего: {anounce.speakerName}
  </p>
  <p class={anounce.videoUrl ? "" : "text-red-500"}>
    Ссылка на видео: {anounce.videoUrl}
  </p>
</a>
