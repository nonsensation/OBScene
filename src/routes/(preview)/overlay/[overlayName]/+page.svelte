<style lang="postcss">
</style>

{#if overlay}
    <svelte:component this={overlay} />
{:else}
    NOT FOUND
{/if}

<script type="text/javascript">
    // import Scoreboard_Floorball_Goal_v2 from "$lib/overlays/Scoreboard_Floorball_Goal_v2.svelte";

    import { page } from "$app/stores";
    import { onMount } from "svelte";

    export let data;

    let { overlayName } = data; // $page.data.team.id
    let overlay;

    onMount(async () => {
        overlay = (await import(`/src/lib/overlays/${overlayName}.svelte`)).default;
    });
</script>
