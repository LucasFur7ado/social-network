<script>
import { onMount } from "svelte"
import { page } from "$app/stores"
import { loadUser } from "../../actions.js"
import { loadProfile, follow } from "./actions.js"
import PostCard from "$lib/components/cards/PostCard.svelte"

let user, pageUser = null, data = null 
onMount(async () => {
  data = await loadProfile($page.params.id)
  pageUser = data?.data?.user 
  user = await loadUser()
})
</script>

<div class="p-4 font-[mainFont] flex flex-col">
  <div class="flex justify-between border-b-[1px] pb-4 border-[var(--secondary)]">
    <div class="flex-col flex">
      {#if pageUser == null}
        <div class="h-8 w-40 bg-[var(--secondary)] rounded-lg"></div>
        <div class="h-4 w-32 mt-2 bg-[var(--secondary)]  rounded-lg"></div>
      {:else}
        <span class="text-3xl">{pageUser?.name}</span>
        <span class="text-[22px] text-[var(--semi-transparent)]"
          >@{pageUser?.username}</span>
      {/if}
    </div>
    <div class="flex flex-col items-end text-lg">
      <a href={user?.id == pageUser?.id ? '/followers' : ''}>
        <span>{pageUser?.followers ?? "..."} seguidores</span>
      </a>
      {#if !(pageUser?.id == user?.id)}
        <button on:click="{() => {
          follow($page.params.id, pageUser.followed)
          pageUser.followers = pageUser.followed ? 
          pageUser.followers - 1 : pageUser.followers + 1
          pageUser.followed = !pageUser.followed 
        }}"
          class="{`${ pageUser?.followed
              ? 'border-[1px] bg-transparent text-white'
              : 'bg-white text-black'} rounded-full px-8 py-0 
              font-[mainFont] w-full text-[16px]`}">
          {pageUser?.followed ? "Unfollow" : "Follow"}
        </button>
      {/if}
    </div>
  </div>
</div>
<div class="grid gap-2 p-4">
  {#each data == null ? new Array(5) : data?.data?.posts as post}
    <PostCard post="{post}" />
  {:else}
    <span class="p-4 font-[mainFont] text-[var(--semi-transparent)] text-2xl"> 
      No hay publicaciones (◡︵◡) 
    </span>
  {/each}
</div>
