<script>
import NavBar from "./NavBar.svelte"
</script>

<div class="flex justify-center w-full pt-12">
  <div class="w-[60rem] flex flex-row justify-between gap-2">
    <NavBar />
    <div class="overflow-scroll w-[75%]">
      <slot />
    </div>
  </div>
</div>
