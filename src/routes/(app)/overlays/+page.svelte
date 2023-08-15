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
            border-radius: var(--border-radius);
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

    span {
        position:absolute;
        bottom: 0;
        left: 0;
        font-size: 75%;
        font-weight: bold;
        background-color: white;
        width: 100%;
        padding: 0.5em;
        border-radius: var(--border-radius);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border: var(--border);
        z-index: 19999;
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
