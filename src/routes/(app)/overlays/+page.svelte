<style lang="postcss">
    .cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        margin: 1rem;
        margin: 1rem 0;
        padding: 2rem;

        .card {
            /* flex: 1 1 15rem;
            min-width: 15rem; */
            width: 100%;
            min-height: 17rem;
            height: auto;
            border-radius: 0.25rem;
            position: relative;

            &:hover,
            &:focus {
                outline: 3px solid teal;
                box-shadow: 0 0 1rem teal;
            }
        }
    }

    .preview {
        background: gray
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
        background-size: 1rem 1rem;
    }
</style>

<h1>Overlays</h1>

<div class="cards">
    {#each overlays as overlay}
        <a class="card preview" href="/overlay/active" on:click={() => ($currentOverlayId = overlay.id)}>
            <span>{overlay.displayName} (#{overlay.id})</span>
            <svelte:component this={overlay.component} scale={75} />
        </a>
    {/each}
</div>

<script>
    import { onMount } from "svelte";
    import { currentOverlayId , loadOverlays } from "$lib/stores/scoreboard-store";

    let overlays = [];

    onMount(async () => {
        overlays = await loadOverlays()
    });
</script>
