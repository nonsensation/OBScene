<style lang="postcss">
    button.delete {
        border-color: crimson;

        &:hover,
        &:focus {
            outline-color: crimson;
        }
    }
</style>

<h1>{team.name}</h1>

<button on:click={deleteTeam} class="delete">Delete Team</button>

<script>
    import { goto } from "$app/navigation";
    import { db } from "$lib/database/dexie-db";

    export let data;

    let { team } = data;

    async function deleteTeam() {
        if (!confirm(`Delete Team ${team.name}?`)) return;

        await db.teams.delete(team.id);

        goto("/teams");
    }
</script>
