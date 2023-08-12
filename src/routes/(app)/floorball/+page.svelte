<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .dseg {
        font-family: DSEG7-Classic;
        font-size: 5rem;
    }

    .quantico {
        font-family: "Quantico", sans-serif;
        font-size: 5rem;
    }

    .scoreboard {
        display: flex;
        flex-direction: column;
        place-items: stretch;
        place-content: stretch;

        & * {
            outline: 1px solid red;
        }
    }

    img {
        width: 1em;
        height: auto;
    }
</style>

<div class="scoreboard">
    <div class="team">
        <div class="teamname">HOME</div>
    </div>

    <div class="quantico dseg">13</div>

    <!-- <Scoreboard /> -->
</div>

<ul>
    {#if $teams}
        {#each $teams as team (team.id)}
            <button on:click={() => lol(team.id)}>{team.Name}</button>
            <img src={URL.createObjectURL(team.logo)} alt=""/>
        {/each}
    {/if}
</ul>

<script>
    import "dseg/css/dseg.css";

    import { obsSendData } from "$lib/stores/obs-store";
    // import Scoreboard from "./Scoreboard.svelte";
    import { scoreboard } from "$lib/stores/scoreboard-store";

    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";

    let teams = liveQuery(() => db.teams.toArray());

    function lol(id)
    {
        scoreboard.home.teamId = id
        console.log('ID: ' + id)
    }
</script>
