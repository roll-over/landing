<script lang="ts">
  import CenteredPage from "$lib/components/blocks/CenteredPage.svelte";

  $: template = "podcast";
  $: form = {
    name: "name",
    host: "IT's open mic",
    title: "title",
    image: "",
  };

  $: newImage = null;

  const fields = {
    podcast: {
      name: {
        type: "text",
        placeholder: "name",
      },
      host: {
        type: "text",
        placeholder: "host",
      },
      title: {
        type: "text",
        placeholder: "title",
      },
      image: {
        type: "image",
        title: "image",
      },
    },
    podcast2: {
      name1: {
        type: "text",
        placeholder: "name1",
      },
      name2: {
        type: "text",
        placeholder: "name2",
      },
      host: {
        type: "text",
        placeholder: "host",
      },
      title: {
        type: "text",
        placeholder: "title",
      },
      image1: {
        type: "image",
        title: "image1",
      },
      image2: {
        type: "image",
        title: "image2",
      },
    },
  };

  const defaults = {
    podcast: {
      name: "name",
      host: "IT's open mic",
      title: "title",
      image: "",
    },
    podcast2: {
      name1: "name1",
      name2: "name2",
      host: "IT's open mic",
      title: "title",
      image1: "",
      image2: "",
    },
  };
  function getImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = dataUrl;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (el: any, err: ErrorEvent) => {
        reject(err.error);
      };
    });
  }
  export async function downscaleImage(
    dataUrl: string,
    imageType: string, // e.g. 'image/jpeg'
    resolution: number, // max width/height in pixels
    quality: number, // e.g. 0.9 = 90% quality
  ): Promise<string> {
    // Create a temporary image so that we can compute the height of the image.
    const image = await getImage(dataUrl);
    const oldWidth = image.naturalWidth;
    const oldHeight = image.naturalHeight;

    const longestDimension = oldWidth > oldHeight ? "width" : "height";
    const currentRes = longestDimension == "width" ? oldWidth : oldHeight;

    if (currentRes > resolution) {
      const newSize =
        longestDimension == "width"
          ? Math.floor((oldHeight / oldWidth) * resolution)
          : Math.floor((oldWidth / oldHeight) * resolution);
      const newWidth = longestDimension == "width" ? resolution : newSize;
      const newHeight = longestDimension == "height" ? resolution : newSize;

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw the downscaled image on the canvas and return the new data URL.
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      const newDataUrl = canvas.toDataURL(imageType, quality);
      return newDataUrl;
    } else {
      return dataUrl;
    }
  }

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

            form[field] = await downscaleImage(`data:image/png;base64,${base64String}`, "image/jpeg", 500, 0.9);
            console.log(form[field]);
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
