<script>
export let user = null
</script>

{#if (user == null)}
  <div
    class="bg-gradient-to-r from-[var(--secondary)] 
    rounded-lg w-full h-32 mb-2">
  </div>
{:else}
  <a href="{`/profile/${user?.id}`}"
    class="border-[1px] border-[var(--secondary)] p-4 rounded-lg
              hover:bg-[var(--secondary)] duration-300 flex justify-between">
    <div class="flex flex-col">
      <span class="text-2xl h-6">{user?.name}</span>
      <span class="text-[var(--semi-transparent)] text-lg"
        >{user?.username}</span>
    </div>
  </a>
{/if}
