<script>
    import { slide } from 'svelte/transition'
    export let text, color = "bg-[#5AA598]";
</script>

<div transition:slide outro:fade class={`fixed top-0 left-[50%] translate-x-[-50%] my-4
rounded-full px-8 py-2 font-[mainFont] ${color}`}>
    {text}
</div>