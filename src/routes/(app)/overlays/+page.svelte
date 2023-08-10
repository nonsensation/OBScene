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
        <a class="card preview" href="/overlay/{overlay.name}">
            <svelte:component this={overlay.component} scale={75} />
        </a>
    {/each}
</div>

<script>
    import { fade } from "svelte/transition";

    import { onMount } from "svelte";
    let overlays = [];
    let overlayNames = [
        "Scoreboard_PremierLeague_v1",
        "Scoreboard_Floorball_Goal_v2",
        "Scoreboard_Floorball_WFC2019_v1",
    ];

    onMount(async () => {
        for (const overlayName of overlayNames) {
            // cannot use $lib in dynamic string import (yet)
            // See: https://github.com/vitejs/vite/pull/7756
            const componentName = `/src/lib/overlays/${overlayName}.svelte`;
            const component = (await import(componentName)).default;
            const overlay = {
                name: overlayName,
                component,
            };
            overlays = [...overlays, overlay];
        }
    });
</script>
