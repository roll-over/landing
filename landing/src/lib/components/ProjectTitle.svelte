<script>
  export { title, panch, logo };

  let title = "";
  let panch = "";
  let logo = "";
</script>

<div class="flex flex-col sm:flex-row justify-between">
  <div class="flex flex-col gap-10">
    <h1>{title}</h1>
    <p>{panch}</p>
  </div>
  <div class="flex justify-center p-10">
    <img src={logo} alt="logo" class="max-h-32 max-w-32 rounded-2xl" />
  </div>
</div>

<style>
</style>
