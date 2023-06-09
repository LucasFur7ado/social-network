<script>
import Cookies from "js-cookie"
import { onMount } from "svelte"
import postStore from "$lib/store/post.js"
import { loadData, loadUser } from "./actions.js"
import NewPostEditor from "./NewPostEditor.svelte"
import PostCard from "$lib/components/cards/PostCard.svelte"

let data = null, user 
onMount(async () => {
  data = await loadData()
  user = await loadUser()
})

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
  <div class="gap-2 grid p-2 pt-0">
    <NewPostEditor />
    <div class="grid gap-2 p-2">
      {#each (data == null || !data.success) 
      ? new Array(9) : data?.data as post}
        <PostCard post="{post}" {user} />
      {/each}
    </div>
  </div>
</section>
