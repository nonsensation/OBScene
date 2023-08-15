<style lang="postcss">
    a {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

<a in:fade href="/overlays" title="Click anywhere to go back">
    {#if overlay}
        <svelte:component this={overlay.component} {scale} />
    {/if}
</a>

<script type="text/javascript">
    import { currentOverlayId, loadOverlay } from "$lib/stores/scoreboard-store";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    const scale = $page.url.searchParams.get("scale") ?? "100";

    let overlay;

    onMount(async () => {
        console.log( "Overlays: "+ $currentOverlayId)
        overlay = await loadOverlay($currentOverlayId);
    });

    $: loadOverlay($currentOverlayId).then( result => overlay = result )
</script>
