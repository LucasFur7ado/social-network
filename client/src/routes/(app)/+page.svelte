<script>
import Cookies from "js-cookie"
import { onMount } from "svelte"
import { loadData } from "./actions.js"
import postStore from "$lib/store/post.js"
import NewPostEditor from "./NewPostEditor.svelte"
import PostCard from "$lib/components/cards/PostCard.svelte"

let data = null
onMount(async () => (data = await loadData()))

$: {
  if ($postStore.newPost !== null) {
    let user = Cookies.get("user") ?? false
    data.data.unshift({
      ...$postStore.newPost,
      username: JSON.parse(user).username,
      name: JSON.parse(user).name,
    }); data = data
    $postStore.newPost = null 
  }
}
</script>

<section class="h-full rounded-lg w-full h-screen relative">
  <div class="gap-2 grid">
    <NewPostEditor />
    {#each (data == null || !data.success) 
    ? new Array(9) : data?.data as post}
      <PostCard post="{post}" />
    {/each}
  </div>
</section>
