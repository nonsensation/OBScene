<style lang="postcss">
    img {
        width: 3em;
        height: auto;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
    }

    .selected {
        background-color: lavender;
    }

    label {
        font-size: 80%;
    }

    .color {
        width: 100%;
        height: 2em;
        overflow: hidden;
        border: var(--border);
        border-radius: var(--border-radius);

        input[type="color"] {
            border: 0;
            width: 200%;
            height: 200%;
            cursor: pointer;
            transform: translate(-25%, -25%);
        }
    }
</style>

<h1>Under Construction</h1>

<div class="container">
    <div class="team home">
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
        <div class="color">
            <input bind:value={$scoreboard.home.primaryColor} type="color" id="home-primaryColor" />
        </div>
        <label for="home-secondaryColor">Nebenfarbe:</label>
        <div class="color">
            <input bind:value={$scoreboard.home.secondaryColor} type="color" id="home-secondaryColor" />
        </div>
        <label for="home-textColor">Textfarbe:</label>
        <div class="color"><input bind:value={$scoreboard.home.textColor} type="color" id="home-textColor" /></div>
        <label for="home-scoreColor">Punktefarbe:</label>
        <div class="color"><input bind:value={$scoreboard.home.scoreColor} type="color" id="home-scoreColor" /></div>
    </div>

    <div class="team guest">
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

        <label for="home-primaryColor">Hauptfarbe:</label>
        <div class="color">
            <input bind:value={$scoreboard.guest.primaryColor} type="color" id="home-primaryColor" />
        </div>
        <label for="home-secondaryColor">Nebenfarbe:</label>
        <div class="color">
            <input bind:value={$scoreboard.guest.secondaryColor} type="color" id="home-secondaryColor" />
        </div>
        <label for="home-textColor">Textfarbe:</label>
        <div class="color"><input bind:value={$scoreboard.guest.textColor} type="color" id="home-textColor" /></div>
        <label for="home-scoreColor">Punktefarbe:</label>
        <div class="color"><input bind:value={$scoreboard.guest.scoreColor} type="color" id="home-scoreColor" /></div>
    </div>
</div>

<script>
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";
    import { scoreboard } from "$lib/stores/scoreboard-store";
    import { onMount } from "svelte";

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
</script>
