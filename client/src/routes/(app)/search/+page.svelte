<script>
import { search } from "./actions.js"
import Results from "./Results.svelte"
</script>

<div class="gap-4 p-4 font-[mainFont] flex flex-col">
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-2">
      <span class="text-3xl font-[mainFont]">Buscar usuario</span>
    </div>
    <form on:submit="{search}" class="flex items-center justify-between gap-2">
      <input class="rounded-lg p-4 py-2 border-[1px] flex-1 
        border-[var(--secondary)] bg-transparent text-lg"
        type="text" name="user"
        placeholder="Nombre o usuario" />
      <button type="submit"
        class="rounded-lg h-12 flex items-center 
        justify-center w-12 p-2 text-2xl bg-[var(--secondary)]">
        <i class="bx bx-search"></i>
      </button>
    </form>
  </div>
  <Results />
</div>
