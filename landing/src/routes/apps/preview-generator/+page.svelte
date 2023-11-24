<script lang="ts">
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";

  $: image = null;
  $: template = "podcast";
  $: name = "name";
  $: host = "IT's open mic";
  $: title = "title";

  $: newImage = null;

  const generateNewPage = async () => {
    const _newImage = await fetch("/apps/preview-generator/api/", {
      method: "POST",
      body: JSON.stringify({
        template: template,
        name,
        host,
        title,
        image,
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
  <select bind:value={template}>
    <option value="podcast">podcast</option>
  </select>
  <input
    type="text"
    bind:value={name}
    on:input={(e) => {
      name = e.target.value;
    }}
  />

  <input
    type="text"
    bind:value={host}
    on:input={(e) => {
      host = e.target.value;
    }}
  />

  <input
    type="text"
    bind:value={title}
    on:input={(e) => {
      title = e.target.value;
    }}
  />

  <div>
    <input
      type="file"
      id="file"
      name="file"
      accept="image/*"
      on:change={async (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

          image = `data:image/png;base64,${base64String}`;
        };
        const base64Image = await reader.readAsDataURL(e.target.files[0]);
      }}
    />

    <svg>
      <image href={image} width="100%" height="100%"></image>
    </svg>

    <button on:click={generateNewPage}>Generate</button>

    <img src={newImage} alt="new image" />
  </div>
</CenteredPage>

<style>
  select,
  input {
    background-color: black;
    color: white;
    padding: 5;
  }
</style>
