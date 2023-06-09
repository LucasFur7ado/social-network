<script>
import searchStore from "$lib/store/search.js"
import UserCard from "$lib/components/cards/UserCard.svelte"
</script>

{#if $searchStore.data !== null || $searchStore.searching !== null}
  <div class="grid gap-2">
    {#each $searchStore?.searching == true ? new Array(6) 
    : $searchStore?.data as result}
      <UserCard user={result} />
    {/each}
  </div>
{/if}
