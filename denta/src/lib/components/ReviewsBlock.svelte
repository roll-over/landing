<script lang="ts">
  import { Ratings, getToastStore } from "@skeletonlabs/skeleton";
  import AiFillStar from "svelte-icons-pack/ai/AiFillStar";
  import AiOutlineStar from "svelte-icons-pack/ai/AiOutlineStar";
  import Icon from "svelte-icons-pack";
  import BsStarHalf from "svelte-icons-pack/bs/BsStarHalf";
  import { newReviewSchema } from "$lib/types/reviews";
  import { page } from "$app/stores";
  import { localisation } from "$lib/localisation/localisation";
  $: l = localisation($page.params.lang);

  export let reviews: {
    reviewId: string;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  }[];
  export let value = { current: 0, max: 5, comment: "" };
  export let rating = 0;
  export let rootId: string;
  export let userReview: string;
  export let allUserReviews: string[];
  export let session: { user: { name: string; email: string; image: string } } | null;
  const toastStore = getToastStore();

  function iconClick(event: CustomEvent<{ index: number }>): void {
    if (!session) {
      toastStore.trigger({
        message: "Войдите, чтобы оставить отзыв",
        hideDismiss: true,
        background: "variant-filled-warning",
      });
      return;
    }

    value.current = event.detail.index;
  }
</script>

<div class="card variant-glass-primary flex flex-col p-4 gap-4">
  <div class="flex flex-row">
    <h2 class="w-full">
      {l("Отзывы")}: {reviews.length} (<Icon src={AiFillStar} className="inline w-4 h-4" />
      {rating})
    </h2>
  </div>
  {#each reviews as review}
    <div class="card variant-glass-primary">
      <header class="card-header">
        <h3>{review.name} <Icon src={AiFillStar} className="inline w-4 h-4" /> {review.rating}</h3>
      </header>
      <div class="pl-8 p-4">
        <p>{review.comment}</p>
      </div>
      <footer
        class="card-footer text-gray-600 flex flex-row flex-wrap items-center justify-between"
      >
        {#if allUserReviews.includes(review.reviewId)}
          <p>{l("Это Ваш отзыв")}</p>
          <div>
            <button
              class="btn btn-primary"
              on:click={async () => {
                await fetch(`/api/reviews/${review.reviewId}`, {
                  method: "DELETE",
                });

                window.location.reload();
              }}
            >
              {l("Удалить")}
            </button>
            <button> {l("Редактировать")} </button>
          </div>
        {/if}
      </footer>
    </div>
  {/each}
  {#if !userReview}
    <div class="p-2 card variant-glass-primary">
      <h3>{l("Оставить отзыв")}</h3>

      <h4>
        {#if session}
          {l("Ваше имя")}: {session.user.name}
        {:else}
          {l("Войдите, чтобы оставить отзыв")}
        {/if}
      </h4>

      <section>
        <h4>{l("Ваша оценка")}:</h4>
        <Ratings bind:value={value.current} max={value.max} interactive on:icon={iconClick}>
          <svelte:fragment slot="empty">
            <Icon src={AiOutlineStar} className="w-10 h-10" />
          </svelte:fragment>
          <svelte:fragment slot="half">
            <Icon src={BsStarHalf} className="w-10 h-10" />
          </svelte:fragment>
          <svelte:fragment slot="full">
            <Icon src={AiFillStar} className="w-10 h-10" />
          </svelte:fragment>
        </Ratings>
      </section>

      <h4>{l("Ваш коментарий")}:</h4>
      <textarea class="textarea p-2 md:p-4" bind:value={value.comment}></textarea>

      <button
        class="btn btn-primary"
        on:click={async () => {
          if (!session) {
            toastStore.trigger({
              message: l("Войдите, чтобы оставить отзыв"),
              hideDismiss: true,
              background: "variant-filled-warning",
            });
            return;
          }

          if (!value.current) {
            toastStore.trigger({
              message: l("Поставьте оценку"),
              hideDismiss: true,
              background: "variant-filled-warning",
            });
            return;
          }

          const body = newReviewSchema.safeParse({
            name: session.user.name,
            avatar: session.user.image,
            rating: value.current,
            comment: value.comment,
            rootId: rootId,
            lang: $page.params.lang,
            entityId: "",
          });

          if (!body.success) {
            toastStore.trigger({
              message: l("Заполните все поля"),
              hideDismiss: true,
              background: "variant-filled-warning",
            });
            return;
          }

          await fetch("/api/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body.data),
          });
          window.location.reload();
        }}
      >
        {l("Отправить")}
      </button>
    </div>
  {/if}
</div>
