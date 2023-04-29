<script>
import { formatDate } from "../../services/dateFormatter"
import { like } from '../actions.js'
export let post = null
</script>

{#if post == null}
  <div class="border-[1px] bg-gradient-to-r from-[#141414] to-[#202020] 
   border-[#202020] rounded-lg w-full h-32"></div>
{:else}
  <div class="border-[1px] border-[#202020] rounded-lg p-4 w-full">
    <div class="flex flex-row justify-between text-[16px] gap-2 mb-2">
      <a
        href="{`/profile/${post?.userId}`}"
        class="font-[mainFont] text-[20px]">
        <span class="{`h-4 text-[#5AA598]`}">{post?.name}</span>
        <span class="opacity-[.3]">@{post?.username}</span>
      </a>
      {#if !post?.isPublic}
        <div>
          <i class="text-[14px] text-blue-400 bx bxs-circle"></i>
        </div>
      {/if}
    </div>
    <p class="font-[arial] text-[16px]">
      {post?.content}
    </p>
    <div class="w-full pt-1 flex justify-between gap-2 opacity-[.3]">
      <span class="font-[mainFont]">
        {post?.createdAt ? formatDate(post?.createdAt) : "..."}</span>
      <div class="flex items-center gap-2 text-lg">
        <button class="flex items-center gap-1" 
        on:click={() => {
          like(post?.id, post?.liked)
          post.liked ? post.likesCount-- : post.likesCount++ 
          post.liked = !post.liked 
        }}>
          <span class="font-[mainFont]">
            {post?.likesCount !== 0 ? post?.likesCount : ''}</span>
          <i class={post?.liked ? `bx bxs-heart` : `bx bx-heart`}></i>
        </button>
        <i class="bx bx-comment"></i>
      </div>
    </div>
  </div>
{/if}
