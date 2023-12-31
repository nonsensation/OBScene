<style lang="postcss">
    img {
        width: 3em;
        height: auto;
    }

    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 2rem;

        .halfwidth {
            --min-width: 20rem;
            flex: 1 1 var(--min-width);
            min-width: var(--min-width);
        }
        .fullwidth {
            flex-basis: 100%; /* new full width row */
            width: 100%;
        }
    }

    .selected {
        background-color: lavender;
    }

    label {
        font-size: 80%;
    }

    select {
        margin-bottom: 1em;
    }

    .color {
        width: 100%;
        height: 2.5em;
        overflow: hidden;
        border: var(--border);
        border-radius: var(--border-radius);
        position: relative;
        margin-bottom: 1em;

        input[type="color"] {
            border: 0;
            width: 200%;
            height: 200%;
            cursor: pointer;
            transform: translate(-25%, -25%);
        }

        &[data-color]:after {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            content: attr(data-color);
            text-transform: uppercase;
            font-weight: bold;
            mix-blend-mode: difference;
            color: white;
            pointer-events: none;
        }
    }

    .preview {
        background: gray
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
        background-size: 1rem 1rem;

        width: 100%;
        min-height: 10rem;
        height: auto;
        border-radius: 0.25rem;
        position: relative;

        display: flex;
        place-content: center;
        place-items: center;
    }

    .sbImgWrap {
        background: gray
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
        background-size: 1rem 1rem;
        width: 100%;
        padding: 1rem;
    }
    .sbImg {
        --threshold: 10%;
        width: 100%;
        filter: invert() grayscale() brightness() contrast(1000%);

        mix-blend-mode: multiply;
        isolation: isolate;
    }
</style>

<h1>Match Setup</h1>

<button on:click={getSceneList}>Szenen</button>

{#if sceneList}
    {#each sceneList.filter( s => !s.sceneName.startsWith('_') ) as scene}
        <button on:click={async () => setScene(scene.sceneName)}>{scene.sceneName}</button>
    {/each}
{/if}

<div class="container">
    <div class="fullwidth">
        <label for="time-color">OBS Link:</label>
        <button
            id="time-color"
            on:click={() => navigator.clipboard.writeText(window.location.origin + "/overlay/active")}
            >{window.location.origin + "/overlay/active"}</button
        >
    </div>

    <div class="fullwidth team">
        <h2>Preview</h2>

        <div class="preview">
            {#if currentOverlay}
                <svelte:component this={currentOverlay.component} scale={50} />
            {:else}
                <span>Overlay not set!</span>
            {/if}
        </div>
    </div>

    <div class="fullwidth">
        <h2>Overlay</h2>

        <label for="overlay">Overlay:</label>
        <select id="overlay" bind:value={$currentOverlayId}>
            {#if Overlays}
                {#each Overlays as overlay}
                    <option class:selected={$currentOverlayId === overlay.id} value={overlay.id}>
                        {overlay.displayName}
                    </option>
                {/each}
            {/if}
        </select>
    </div>

    <div class="fullwidth">
        <h2>Scoreboard</h2>

        <button on:click={() => ($scoreboard.time.enabled = !$scoreboard.time.enabled)}>Toggle Time</button>

        <label for="time-color">Timer:</label>
        <div class="color" data-color={$scoreboard.time.textColor}>
            <input bind:value={$scoreboard.time.textColor} type="color" id="time-color" />
        </div>

        <button on:click={() => ($scoreboard.period.enabled = !$scoreboard.period.enabled)}>Toggle Period</button>

        <label for="period-color">Periode:</label>
        <div class="color" data-color={$scoreboard.period.textColor}>
            <input bind:value={$scoreboard.period.textColor} type="color" id="period-color" />
        </div>

        <button on:click={() => ($scoreboard.special.enabled = !$scoreboard.special.enabled)}>Toggle Special</button>

        <label for="special-color">Special:</label>
        <div class="color" data-color={$scoreboard.special.textColor}>
            <input bind:value={$scoreboard.special.textColor} type="color" id="special-color" />
        </div>

        <label for="special-text">Special:</label>
        <input type="text" id="special-text" bind:value={$scoreboard.special.text} />
    </div>

    <div class="halfwidth home">
        <h2>Home-Team</h2>

        <!-- <img src={URL.createObjectURL($teams.where('id').equals(selectedTeamHome).first()?.logo)} alt="" /> -->

        <select class="select" bind:value={$scoreboard.home.teamId} on:change={onChange}>
            {#if $teams}
                {#each $teams as team (team.id)}
                    <option value={team.id} class:selected={$scoreboard.home.teamId === team.id}>
                        {team.name} ({team.shortName})
                    </option>
                {/each}
            {/if}
        </select>

        <label for="home-primaryColor">Hauptfarbe:</label>
        <div class="color" data-color={$scoreboard.home.primaryColor}>
            <input bind:value={$scoreboard.home.primaryColor} type="color" id="home-primaryColor" />
        </div>
        <label for="home-secondaryColor">Nebenfarbe:</label>
        <div class="color" data-color={$scoreboard.home.secondaryColor}>
            <input bind:value={$scoreboard.home.secondaryColor} type="color" id="home-secondaryColor" />
        </div>
        <label for="home-textColor">Textfarbe:</label>
        <div class="color" data-color={$scoreboard.home.textColor}>
            <input bind:value={$scoreboard.home.textColor} type="color" id="home-textColor" />
        </div>
        <label for="home-scoreColor">Punktefarbe:</label>
        <div class="color" data-color={$scoreboard.home.scoreColor}>
            <input bind:value={$scoreboard.home.scoreColor} type="color" id="home-scoreColor" />
        </div>
    </div>

    <div class="halfwidth guest">
        <h2>Guest-Team</h2>

        <select class="select" bind:value={$scoreboard.guest.teamId} on:change={onChange}>
            {#if $teams}
                {#each $teams as team (team.id)}
                    <option value={team.id} class:selected={$scoreboard.guest.teamId === team.id}>
                        {team.name} ({team.shortName})
                    </option>
                {/each}
            {/if}
        </select>

        <label for="guest-primaryColor">Hauptfarbe:</label>
        <div class="color" data-color={$scoreboard.guest.primaryColor}>
            <input bind:value={$scoreboard.guest.primaryColor} type="color" id="guest-primaryColor" />
        </div>
        <label for="guest-secondaryColor">Nebenfarbe:</label>
        <div class="color" data-color={$scoreboard.guest.secondaryColor}>
            <input bind:value={$scoreboard.guest.secondaryColor} type="color" id="guest-secondaryColor" />
        </div>
        <label for="guest-textColor">Textfarbe:</label>
        <div class="color" data-color={$scoreboard.guest.textColor}>
            <input bind:value={$scoreboard.guest.textColor} type="color" id="guest-textColor" />
        </div>
        <label for="guest-scoreColor">Punktefarbe:</label>
        <div class="color" data-color={$scoreboard.guest.scoreColor}>
            <input bind:value={$scoreboard.guest.scoreColor} type="color" id="guest-scoreColor" />
        </div>
    </div>

    <button on:click={reset}>Reset all Values!</button>

    <div class="sbImgWrap">
        <img class="sbImg" src={sbImg} />
    </div>
</div>

<script>
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";
    import { scoreboard, loadOverlays, currentOverlayId, Overlays } from "$lib/stores/scoreboard-store";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { obsCall } from "$lib/stores/obs-store";

    import sbImg from "$lib/assets/logos/scoreboard-img.png";

    let overlays = [];
    let currentOverlay;

    let sceneList = [];

    onMount(async () => {
        overlays = await loadOverlays();
    });

    $: currentOverlay = overlays.find((x) => x.id == $currentOverlayId);

    let allTeams;
    let teams;

    async function onChange() {
        const teamHome = await db.teams.get({ id: $scoreboard.home.teamId });
        const teamGuest = await db.teams.get({ id: $scoreboard.guest.teamId });

        if (teamHome) $scoreboard.home.name = teamHome.name;
        if (teamGuest) $scoreboard.guest.name = teamGuest.name;
    }

    onMount(async () => {
        allTeams = await db.teams.orderBy("name").toArray();
        teams = liveQuery(() => allTeams);
    });

    async function reset() {
        localStorage.removeItem("scoreboard");
    }

    async function getSceneList() {
        let { scenes } = await obsCall("GetSceneList");

        if (scenes) sceneList = scenes;
    }

    async function setScene(sceneName) {
        await obsCall("SetCurrentProgramScene", { sceneName } );
    }
</script>
