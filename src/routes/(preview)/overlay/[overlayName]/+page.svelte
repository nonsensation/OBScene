<style lang="postcss">
    a {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

<a href="/overlays" title="Click anywhere to go back">
    {#if overlay}
        <svelte:component this={overlay} {scale} />
    {/if}
</a>

<script type="text/javascript">
    // import Scoreboard_Floorball_Goal_v2 from "$lib/overlays/Scoreboard_Floorball_Goal_v2.svelte";

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    export let data;

    const scale = $page.url.searchParams.get("scale") ?? "100";

    let { overlayName } = data; // $page.data.team.id
    let overlay;

    onMount(async () => {
        try {
            overlay = (await import(`/src/lib/overlays/${overlayName}.svelte`)).default;
        }
        catch( error )
        {
            goto( '/overlays' )
        }
    });
</script>
