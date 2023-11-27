<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  type Entity =
    | {
        title: string;
        href: string;
        children: Entity[];
      }
    | {
        title: string;
        href: string;
      }
    | {
        title: string;
        children: Entity[];
      };

  export let items: Entity[] = [];
  export let pathname: string = "";
</script>

<ol class="w-full md:block default-bg pl-3">
  {#each items || [] as link}
    <li class="w-full p-1">
      - <a
        on:click={(e) => dispatch("click", e)}
        href={link.href}
        class="{link.href === pathname ? 'bg-gray-300  ' : ''} p-1 w-full"
        >{link.title}
      </a>
      {#if link.children}
        <svelte:self items={link.children} {pathname} />
      {/if}
    </li>
  {/each}
</ol>
