<style lang="postcss">
    button.delete {
        border-color: crimson;

        &:hover,
        &:focus {
            outline-color: crimson;
        }
    }
</style>

{#if team}
    <h1>{team.name}</h1>

    <button on:click={deleteTeam} class="delete">Delete Team</button>
{/if}

<script>
    import { currentTeamId } from "$lib/stores/state-store";
    import { goto } from "$app/navigation";
    import { db } from "$lib/database/dexie-db";
    import { onMount } from "svelte";

    onMount(async () => {
        team = await db.teams.get({ id: $currentTeamId });
    });

    let team;

    async function deleteTeam() {
        if (!confirm(`Delete Team ${team.name}?`)) return;

        await db.teams.delete(team.id);

        goto("/teams");
    }
</script>
