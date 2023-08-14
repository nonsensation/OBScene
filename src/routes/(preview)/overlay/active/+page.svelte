<style lang="postcss">
    a {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

<a in:fade href="/overlays" title="Click anywhere to go back">
    {#if overlay}
        <svelte:component this={overlay} {scale} />
    {/if}
</a>

<script type="text/javascript">
    import { currentOverlayName } from "$lib/stores/scoreboard-store";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    const scale = $page.url.searchParams.get("scale") ?? "100";

    let overlay;

    onMount(async () => {
        await loadOverlay( $currentOverlayName );
    });

    async function loadOverlay( overlayName )
    {
        try {
            const componentName = `/src/lib/overlays/${overlayName}.svelte`;
            overlay = (await import(/* @vite-ignore */ componentName)).default;
        } catch (error) {
            console.error("Could not load dynamic svelte component: " + overlayName, error);
        }
    }

    $: loadOverlay( $currentOverlayName )
</script>
