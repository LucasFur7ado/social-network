<script>
import { formatDate } from "../../services/dateFormatter"
import { like } from "../actions.js"
export let post = null,
  user
</script>

{#if post == null}
  <div
    class="bg-gradient-to-r from-[var(--secondary)] 
   rounded-lg w-full h-32">
  </div>
{:else}
  <div class="rounded-lg w-full py-2">
    <div class="flex flex-row justify-between text-[16px] gap-2 mb-2">
      <a
        href="{`/profile/${post?.userId}`}"
        class="font-[mainFont] text-[20px]">
        <span class="{`h-4 text-[var(--primary)]`}">{post?.name}</span>
        <span class="opacity-[.3]">@{post?.username}</span>
      </a>
      {#if !post?.isPublic}
        <span
          class="bg-[var(--primary)] rounded-full px-4
          text-[var(--background)] flex items-center 
          font-[mainFont] text-[16px] h-6">
          {#if post?.destinationUserId == user?.id}
            Para mi
          {:else}
            Privado
          {/if}
        </span>
      {/if}
    </div>
    <p class="font-[arial] text-[16px]">
      {post?.content}
    </p>
    <div class="w-full pt-1 flex justify-between gap-2 opacity-[.3]">
      <span class="font-[mainFont]">
        {post?.createdAt ? formatDate(post?.createdAt) : "..."}</span>
      <div class="flex items-center gap-2 text-lg">
        <button
          class="flex items-center gap-1"
          on:click="{() => {
            like(post?.id, post?.liked)
            post.liked ? post.likesCount-- : post.likesCount++
            post.liked = !post.liked
          }}">
          <span class="font-[mainFont]">
            {post?.likesCount !== 0 ? post?.likesCount : ""}</span>
          <i class="{post?.liked ? `bx bxs-heart` : `bx bx-heart`}"></i>
        </button>
      </div>
    </div>
  </div>
{/if}
