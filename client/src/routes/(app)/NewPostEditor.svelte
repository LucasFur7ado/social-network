<script>
import { onMount } from "svelte"
import Lists from "./Lists.svelte"
import { loadUser, handleSubmit } from "./actions"

let content = "",
  data = null
onMount(async () => (data = await loadUser()))
</script>

<form on:submit="{handleSubmit}"
  class="border-[1px] border-[#202020] 
rounded-lg flex flex-col justify-between">
  <div class="p-2 font-[mainFont] flex items-center justify-between">
    <div class="flex items-center gap-2">
      <i class="bx bxs-circle text-[10px] text-[#5AA598]"></i>
      <span>
        {data?.name ?? ". . ."}
      </span>
    </div>
    <Lists />
  </div>
  <textarea class="{`font-[arial] text-[16px] outline-0 bg-[#141414] 
    h-24 border-y-[1px] border-[#202020] p-2`}"
    placeholder="Escribe algo..."
    name="content"
    bind:value="{content}"></textarea>
  <div class="w-full flex items-center justify-between p-2">
    <span class="font-[mainFont]"
      >{300 - content.length !== 300 ? 300 - content.length : ""}</span>
    <button class="w-[30%] rounded-full px-2 py-1 bg-[#5AA598] text-[15px] 
        font-[mainFont] text-black">
      Publicar 
    </button>
  </div>
</form>
