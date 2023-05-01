<script>
import { onMount } from "svelte"
import { page } from "$app/stores"
import { loadProfile, follow } from "./actions.js"
import PostCard from "$lib/components/cards/PostCard.svelte"

let data = null
onMount(async () => (data = await loadProfile($page.params.id)))
</script>

<div class="p-4 font-[mainFont] flex flex-col">
  <div class="flex justify-between border-b-[1px] pb-4 border-[#202020]">
    <div class="flex-col flex">
      {#if data == null}
        <div class="h-8 w-40 bg-[#202020] rounded-lg"></div>
        <div class="h-4 w-32 mt-2 bg-[#202020] rounded-lg"></div>
      {:else}
        <span class="text-3xl">{data?.data?.user?.name}</span>
        <span class="text-[22px] text-[#555]"
          >@{data?.data?.user?.username}</span>
      {/if}
    </div>
    <div class="flex flex-col items-end gap-2 text-lg">
      <span>{data?.data?.user?.followers ?? "..."} seguidores</span>
      <button on:click="{() => {
        follow($page.params.id, data?.data?.user?.followed)
        data.data.user.followers = data.data.user.followed ? 
        data.data.user.followers - 1 : data.data.user.followers + 1
        data.data.user.followed = !data.data.user.followed 
      }}"
        class="{`${ data?.data?.user?.followed
            ? 'border-[1px] bg-transparent text-white'
            : 'bg-white text-black'} rounded-full px-8 py-0 
            font-[mainFont] w-full text-[16px]`}">
        {data?.data?.user?.followed ? "Unfollow" : "Follow"}
      </button>
    </div>
  </div>
  <div class="grid gap-2 pt-4">
    {#each data == null ? new Array(5) : data?.data?.posts as post}
      <PostCard post="{post}" />
    {:else}
      <span class="text-[#555] text-2xl"> No hay publicaciones (◡︵◡) </span>
    {/each}
  </div>
</div>
