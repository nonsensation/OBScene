<style lang="postcss">
    a[role="button"] {
        /* border: 1px solid black; */
        border-radius: 0.25rem;
        padding: 0.5rem;
        display: inline-block;
        width: 100%;

        &:hover,
        &:focus {
            cursor: pointer;
            background-color: gainsboro;
        }
    }

    .table {
        display: grid;
        grid-template-rows: 1fr auto 1fr;
        border: 1px solid black;
        border-radius: 0.25rem;
        max-height: 80%;

        .header,
        .footer {
            font-weight: bold;
        }

        .header {
            display: flex;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: 1px solid black;
        }

        .row {
            display: grid;
            grid-template-columns: auto 1fr auto;
            place-content: center;
            place-items: center;
            width: 100%;
            padding: 0.25em 1em;

            &:nth-child(even) {
                background-color: rgba(0, 0, 0, 0.05);
            }
        }

        .content .row {
            &:hover,
            &:focus {
                background-color: gainsboro;
            }
        }

        .content {
            max-height: 10rem;
            overflow-y: scroll;
        }

        .footer {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid black;
        }
    }

    .table {
        display: none;
    }

    .cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        margin: 1rem;
        margin: 1rem 0;
        padding: 2rem;

        max-height: 60%;
        overflow-y: scroll;
        border: 1px solid gray;
        border-radius: 0.25rem;
        box-shadow: inset 0 0 3px gray;
        background-color: gainsboro;
        background-color: white;

        .card {
            flex: 1 1 15rem;
            min-width: 15rem;
            min-height: 17rem;
            border-radius: 0.25rem;
            position: relative;
            /* outline: 1px solid black; */

            &:hover,
            &:focus {
                outline: 3px solid teal;
                box-shadow: 0 0 1rem teal;

                & .name {
                    /* border: none; */
                    /* filter: invert(); */
                    /* box-shadow: none; */
                }
            }

            .logo {
                position: absolute;
                top: 0;
                left: 0;
                height: 15rem;
                width: 100%;
                background-color: aqua;
                padding: 0.5rem;

                object-fit: contain;
                cursor: pointer;
                border: 1px solid gray;
                border-radius: 0.25rem;

                background: white
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".05" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
                background-size: 1.5rem 1.5rem;
                box-shadow: inset 0 0 10px gray;

                /* background: white; */
            }

            .name {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                bottom: 0;
                height: 2.5rem;
                width: 100%;
                border: 1px solid gray;
                border-bottom-left-radius: 0.25rem;
                border-bottom-right-radius: 0.25rem;
                border-top: none;
                background-color: white;
                box-shadow: 0px 0px 3px gray;
                font-weight: bold;
            }
        }
    }

    .create {
        border: 1px solid black;
    }
</style>

<!-- <h1>{$teams.length} Teams</h1> -->

<a class="create" role="button" href="/teams/create" title="Add a new Team">
    <span class="icon material-symbols-rounded">add</span>
    <span class="">Add new Team</span>
</a>

<div class="cards">
    {#if $teams}
        {#each $teams as team (team.id)}
            <a class="card" href="/teams/{team.id}" title="See Team {team.name}">
                <img class="logo" src={URL.createObjectURL(team.logo)} alt="Logo" />
                <div class="name">{team.name}</div>
            </a>
        {/each}
    {/if}
</div>

<!-- <div class="table">
    <div class="header">
        <div class="row">
            <div class="col">#</div>
            <div class="col">Team</div>
            <div class="col">Players</div>
        </div>
    </div>
    <div class="content">
        {#each $teams as team}
            <a class="row" href="/team/{team.Id}" title="See Team {team.Name}">
                <div class="col">{team.Id}</div>
                <div class="col">{team.Name}</div>
                <div class="col">0</div>
            </a>
        {/each}
    </div>
    <div class="footer">
        <a role="button" href="/team/create" title="Add a new Team">
            <span class="icon material-symbols-rounded">add</span>
            <span class="">Add new Team</span>
        </a>
    </div>
</div> -->

<script>
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";

    import logo1 from "$lib/assets/logos/Floorball Deutschland 1.png";
    import logo2 from "$lib/assets/logos/Logo Black Lions Landsberg 0.png";
    import logo3 from "$lib/assets/logos/Logo Hannover 96 - SW 3.png";

    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";

    export let data;

    const teams = liveQuery(() => db.teams.toArray());
</script>
