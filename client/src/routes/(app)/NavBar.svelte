<script>
import { onMount } from "svelte"
import { loadUser, logOut } from "./actions"

let data = null
onMount(async () => (data = await loadUser()))
</script>

<nav class="h-[80vh] pb-12 w-[25%]">
  <div class="p-8 justify-between 
    rounded-lg h-full flex flex-col gap-12 bg-[var(--secondary)]">
    <ul class="text-left">
      <a href="/" class="text-2xl gap-2 mb-2  
      flex flex-row items-center w-full font-[mainFont]">
        <i class="bx bxs-home"></i>
        <li>Inicio</li>
      </a>
      <a href="/search" class="text-2xl gap-2 mb-2  
      flex flex-row items-center w-full font-[mainFont]">
        <i class="bx bx-search"></i>
        <li>Buscar</li>
      </a>
      <a href={`/profile/${data?.id}`} class="text-2xl gap-2 mb-2  
      flex flex-row items-center w-full font-[mainFont]">
        <i class="bx bxs-user"></i>
        <li>Cuenta</li>
      </a>
      <a href="/settings" class="text-2xl gap-2 mb-2  
      flex flex-row items-center w-full font-[mainFont]">
        <i class="bx bxs-cog"></i>
        <li>Config.</li>
      </a>
    </ul>
    <div>
      {#if data?.username == null}
        <a href="/login">
          <button class="bg-[#5AA598] text-black rounded-full px-4 py-2
          font-[mainFont] w-full mb-2">
            Iniciar sesión 
          </button>
        </a>
        <a href="/register">
          <button class="bg-transparent border-[1px] rounded-full px-4 py-2
          font-[mainFont] w-full">
            Crear cuenta 
          </button>
        </a>
      {:else}
        <div class="flex flex-col font-[mainFont]">
          <a href={`/profile/${data?.id}`} class="py-4 flex flex-col">
            <span class="h-6">{data?.name}</span>
            <span class="text-[16px] text-[var(--primary-transparent)]">@{data?.username}</span>
          </a>
          <button on:click={logOut} 
          class="bg-transparent border-[1px] rounded-full px-2 py-1
          font-[mainFont] w-full text-lg">
            Cerrar sesión
          </button>
        </div>
      {/if}
    </div>
  </div>
</nav>
