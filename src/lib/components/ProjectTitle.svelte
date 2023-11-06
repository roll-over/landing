<script>
  export { title, panch, logo };

  let title = "";
  let panch = "";
  let logo = "";
</script>

<div class="flex flex-col sm:flex-row justify-between py-16">
  <div class="flex flex-col gap-10">
    <h1>{title}</h1>
    <p>{panch}</p>
  </div>
  <img src={logo} alt="logo" class="max-h-32 max-w-32 rounded-2xl" />
</div>

<style>
</style>
