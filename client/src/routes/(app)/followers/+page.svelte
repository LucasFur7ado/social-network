<script>
import { onMount } from "svelte"
import { loadFollowers } from "./actions.js"
import UserCard from "$lib/components/cards/UserCard.svelte"

let data = null
onMount(async () => {
  data = await loadFollowers()
  data = data.data.followers
})
</script>

<div class="p-4 font-[mainFont] flex flex-col">
  <div class="flex-col flex">
    <span class="text-3xl">Seguidores</span>
  </div>
</div>
<div class="grid gap-2 p-4 font-[mainFont]">
  {#each data == null ? new Array(5) : data as user}
    <UserCard user="{user}" />
  {:else}
    <span class="p-4 font-[mainFont] text-[var(--semi-transparent)] text-2xl">
      No hay publicaciones (◡︵◡)
    </span>
  {/each}
</div>
