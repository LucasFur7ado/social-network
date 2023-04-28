<script>
import "../app.css"
import postStore from "$lib/store/post.js"
import Pop from "$lib/components/Pop.svelte"
</script>

<slot />

<!-- POSTS -->
{#if $postStore.posting}
  <Pop text="Posting..." />
{:else if $postStore.success}
  <Pop text="Posted" color="bg-green-400" />
{:else if $postStore.error}
<Pop text="Something went wrong" color="bg-red-400" />
<!-- LOGIN -->
  <!-- SETTINGS -->
{/if}
