<script>
import searchStore from "$lib/store/search.js"
</script>

{#if $searchStore.data !== null || $searchStore.searching !== null}
  <div class="grid gap-2">
    {#each $searchStore?.searching == true ? new Array(6) 
    : $searchStore?.data as result}
      <a href="{`/profile/${result?.id}`}"
        class="border-[1px] border-[#202020] p-4 rounded-lg
            hover:bg-[#202020] duration-300 flex justify-between">
        <div class="flex flex-col">
          <span class="text-2xl h-6">{result?.name}</span>
          <span class="text-[#555] text-lg">{result?.username}</span>
        </div>
      </a>
    {/each}
  </div>
{/if}
