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
  <button class="rounded-full h-14 w-14 bg-[#252525] flex items-center
        justify-center absolute bottom-0 right-0 m-8">
    <i class="bx bx-plus text-4xl"></i>
  </button>
</div>
