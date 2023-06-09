<script>
import { onMount } from "svelte"
import { loadFullUser, deleteAccount } from "./actions.js"

let user = null,
  open = false
onMount(async () => {
  user = await loadFullUser()
  user = user.data[0]
})
</script>

<div class="p-4 flex flex-col">
  <div class="flex justify-between">
    <div class="flex-col flex">
      {#if user == null}
        <div class="h-8 w-40 bg-[var(--secondary)] rounded-lg"></div>
        <div class="h-4 w-32 mt-2 bg-[var(--secondary)]  rounded-lg"></div>
      {:else}
        <span class="font-[mainFont] text-3xl">{user?.name}</span>
        <br />
        <span>@{user?.username}</span>
        <div class="flex items-center">
          <span>{user?.email}</span>
          <span
            class="bg-[var(--primary)] rounded-full px-4 
            text-[var(--background)] font-[mainFont] ml-2">
            {user?.isVerified ? "Verificado" : "No verificado"}</span>
        </div>
        <span
          on:click="{() => (open = true)}"
          on:keyup="{null}"
          class="cursor-pointer text-red-400 underline mt-4">
          eliminar cuenta
        </span>
        {#if open}
          <div class="flex items-center gap-2 mt-2">
            <span>¿Estás seguro?</span>
            <span on:keyup={null} on:click={deleteAccount} 
            class="cursor-pointer underline">Si</span>
            <span class="cursor-pointer underline">No</span>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>
