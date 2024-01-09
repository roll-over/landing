<script lang="ts">
  import { afterUpdate, tick } from "svelte";
  import type { NewMessage } from "./methods/types";

  export let data;

  let element;
  $: newMessage = "";
  afterUpdate(() => {
    if (data.messages) scrollToBottom(element);
  });
  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };
  $: pickedChat = data.chatIds[0];

  const sendNewMessage = async () => {
    const projectId = data.messages.find((x) => x.userId === pickedChat)?.projectId;

    if (!projectId) {
      throw new Error("projectId not found");
    }

    const _newMessage: NewMessage = {
      projectId,
      userId: pickedChat,
      message: {
        type: "text",
        text: newMessage,
      },
    };

    await fetch("/admin/support/methods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_newMessage),
    });
  };
</script>

<h1>Support</h1>
<div class="flex flex-row bg-gray-400">
  <ul>
    {#each data.chatIds as chatId}
      <li>
        <button on:click={() => (pickedChat = chatId)}>{chatId}</button>
      </li>
    {/each}
  </ul>
  <div class="flex h-full flex-col">
    <ul bind:this={element} class="max-h-[70vh] overflow-y-auto">
      {#each data.messages.filter((x) => x.userId === pickedChat) as message}
        <li class="p-4 {message.author !== 'user' ? 'pl-20 ' : 'pr-20 '}">
          <div class="rounded-xl p-6 {message.author !== 'user' ? ' bg-gray-500' : ' bg-gray-700'}">
            <div class="text-2xl">{message.text}</div>
            <div class="text-ls flex flex-row justify-between opacity-50">
              <p>
                {new Date(message.date).toLocaleString()}
              </p>
              <p>
                {message.author}
              </p>
            </div>
          </div>
        </li>
      {/each}
    </ul>
    <div class="flex flex-row">
      <input
        type="text"
        bind:value={newMessage}
        class="rounded-xl p-5 text-black"
        placeholder="Новое сообщение"
      />
      <button
        class="rounded-xl bg-gray-300 p-5"
        on:click={() => {
          sendNewMessage();
        }}>Send</button
      >
    </div>
  </div>
</div>
