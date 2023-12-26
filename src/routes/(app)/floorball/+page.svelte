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

    .scenes {
        display: flex;
        flex-direction: column;
        place-items: center;
        place-content: center;
        gap: 1rem;
        margin: 1rem 0;

        .scene-list {
            display: flex;
            place-items: space-between;
            place-content: space-between;
            gap: 1rem;
            width: 100%;
        }
    }

    img {
        /* width: 5rem; */
        width: 20%;
    }
    .scoreboard {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        place-content: center;
        font-size: 1.5rem;
        font-weight: bold;

        .teamname {
            font-size: 1rem;
        }

        .score {
            display: flex;
            place-items: center;
            place-content: center;

            gap: 1rem;
            .dseg {
                font-size: 500%;
            }

            .buttons {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                gap: 1rem;
                place-items: stretch;
                place-content: stretch;
            }
        }
    }

    .period {
        display: flex;
        place-items: center;
        place-content: center;
        gap: 1rem;
        span {
            font-weight: bold
            ;
        }
    }
</style>

<Meta title="Floorball" />

<div class="scoreboard">
    <div class="teamname">Home</div>
    <div class="teamname">Guest</div>

    {#if $teams}
        {#each $teams.filter((t) => t.id === $scoreboard.home.teamId) as team (team.id)}
            <img src={URL.createObjectURL(team.logo)} alt="" />
        {/each}
    {/if}
    {#if $teams}
        {#each $teams.filter((t) => t.id === $scoreboard.guest.teamId) as team (team.id)}
            <img src={URL.createObjectURL(team.logo)} alt="" />
        {/each}
    {/if}
    {#if $teams}
        {#each $teams.filter((t) => t.id === $scoreboard.home.teamId) as team (team.id)}
            <span>{team.name}</span>
        {/each}
    {/if}
    {#if $teams}
        {#each $teams.filter((t) => t.id === $scoreboard.guest.teamId) as team (team.id)}
            <span>{team.name}</span>
        {/each}
    {/if}

    <div class="score">
        <div class="buttons">
            <button on:click={() => $scoreboard.home.score++}><Icon name="add" title="" /></button>
            <button on:click={() => ($scoreboard.home.score = Math.max(0, $scoreboard.home.score - 1))}>
                <Icon name="remove" title="" />
            </button>
        </div>
        <div class="dseg">{$scoreboard.home.score}</div>
    </div>
    <div class="score">
        <div class="dseg">{$scoreboard.guest.score}</div>
        <div class="buttons">
            <button on:click={() => $scoreboard.guest.score++}><Icon name="add" title="" /></button>
            <button on:click={() => ($scoreboard.guest.score = Math.max(0, $scoreboard.guest.score - 1))}>
                <Icon name="remove" title="" />
            </button>
        </div>
    </div>
</div>

<label class="period">
    <span>Periode: </span>
    <select bind:value={$scoreboard.period.text}>
        <option value="1. Drittel">1. Drittel</option>
        <option value="2. Drittel">2. Drittel</option>
        <option value="3. Drittel">3. Drittel</option>
        <option value="Verlängerung">Verlängerung</option>
        <option value="Penaltyschießen">Penaltyschießen</option>
    </select>
</label>

<div class="scenes">
    <button on:click={getSceneList}><Icon name="refresh" title="Szenen" /></button>

    <div class="scene-list">
        {#if sceneList}
            {#each sceneList as scene}
                <button on:click={async () => setScene(scene.sceneName)}
                    >{scene.sceneName}
                    <Icon name="image" title="" />
                </button>
            {/each}
        {/if}
    </div>
</div>

<script>
    import "dseg/css/dseg.css";
    import { scoreboard } from "$lib/stores/scoreboard-store";
    import { obsCall, obsSendData } from "$lib/stores/obs-store";
    import { Meta, Icon } from "$lib/components";
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";

    let teams = liveQuery(() => db.teams.toArray());
    let sceneList = [];

    async function getSceneList() {
        let { scenes } = await obsCall("GetSceneList");

        if (scenes) sceneList = scenes.filter((s) => !s.sceneName.startsWith("_"));
    }

    async function setScene(sceneName) {
        await obsCall("SetCurrentProgramScene", { sceneName });
    }
</script>
