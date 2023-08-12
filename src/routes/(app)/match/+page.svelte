<style lang="postcss">
    img {
        width: 3em;
        height: auto;
    }
</style>

<h1>Under Construction</h1>

<ul>
    {#if $teams}
        {#each $teams as team (team.id)}
            <li>
                <span>
                    {team.name} ({team.shortName})
                </span>
                <img src={URL.createObjectURL(team.logo)} alt="" />
            </li>
        {/each}
    {/if}
</ul>

<script>
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";

    let teams = liveQuery(() => db.teams.toArray());
</script>
