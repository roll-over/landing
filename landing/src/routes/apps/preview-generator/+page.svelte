<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";
  import { defaults, fields } from "$lib/preview-generation/fields";
  import { downscaleImage } from "$lib/preview-generation/image-methods";

  $: template = template || $page.url.searchParams.get("template") || "podcast";

  const init = $page.url.searchParams;

  $: form =
    template === "podcast"
      ? { ...defaults.podcast, name: init.get("name"), title: init.get("title") }
      : {
          ...defaults.podcast2,
          name1: init.get("name1"),
          name2: init.get("name2"),
          title: init.get("title"),
        };

  $: newImage = null;

  const generateNewPage = async () => {
    const _newImage = await fetch("/apps/preview-generator/api/", {
      method: "POST",
      body: JSON.stringify({
        template: template,
        form: {
          template: template,
          ...form,
        },
      }),
    }).then(async (res) => {
      if (!res.body) {
        return;
      }
      return await res.blob();
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      newImage = `${base64String}`;
    };
    const base64Image = await reader.readAsDataURL(_newImage);
  };
</script>

<CenteredPage title="Preview generator">
  <select
    bind:value={template}
    on:change={(e) => {
      form = defaults[e.target.value];

      if (e.target.value === "podcast") {
        form.name = $page.url.searchParams.get("name");
        form.title = $page.url.searchParams.get("title");
      } else if (e.target.value === "podcast2") {
        form.name1 = $page.url.searchParams.get("name1");
        form.title1 = $page.url.searchParams.get("title1");
      }
    }}
  >
    <option value="podcast">podcast</option>
    <option value="podcast2">podcast2</option>
  </select>

  {#each Object.keys(fields[template]) as field}
    {#if fields[template][field].type === "text"}
      <input
        type="text"
        placeholder={fields[template][field].placeholder}
        bind:value={form[field]}
        on:input={(e) => {
          form[field] = e.target.value;
        }}
      />
    {:else if fields[template][field].type === "image"}
      <label for="file">{fields[template][field].title}</label>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/*"
        on:change={async (e) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

            form[field] = await downscaleImage(
              `data:image/png;base64,${base64String}`,
              "image/jpeg",
              500,
              0.9,
            );
          };
          const base64Image = await reader.readAsDataURL(e.target.files[0]);
        }}
      />

      <svg>
        <image href={form[field]} width="100%" height="100%"></image>
      </svg>
    {:else}
      <input
        type="text"
        bind:value={form[field]}
        on:input={(e) => {
          form[field] = e.target.value;
        }}
      />
    {/if}
  {/each}

  <button on:click={generateNewPage}>Generate</button>

  <img src={newImage} alt="new image" />
</CenteredPage>

<style>
  select,
  input {
    background-color: black;
    color: white;
    padding: 5;
  }
</style>
