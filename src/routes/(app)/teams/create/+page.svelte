<style lang="postcss">
    fieldset {
        border: var(--border);
        border-radius: var(--border-radius);
        padding: 0.5em 1em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;

        legend {
            background-color: white;
            padding: 0.5em 1em;
            border: var(--border);
            border-radius: var(--border-radius);
        }
    }

    button {
        background-color: gainsboro;
    }
</style>

<Meta title="Add a new Team" />
<div>
    <p>{status}</p>

    <form action="?/create">
        <fieldset>
            <legend>Team</legend>

            <Input
                label="Name:"
                title="Name of the team"
                bind:value={team.name}
                id="teamName"
                type="text"
                errors={errors?.name}
            />
            <ImgInput bind:blob={team.logo} name="logo" label="Logo:" errors={errors?.logo} />
            <Input
                label="ShortName:"
                title="A short name of the team"
                bind:value={team.shortName}
                id="shortName"
                type="text"
                errors={errors?.shortName}
            />
            <button on:click={addTeam}>Add Team</button>
        </fieldset>
    </form>
</div>

<script>
    import { Meta, Input, ImgInput } from "$lib/components";
    import { createEntry, teamSchema , db } from "$lib/database/dexie-db";
    import { goto } from "$app/navigation";

    let status = "";

    let errors;

    let team = {
        name: "",
        shortName: "",
        logo: null, //new Blob(),
    };

    async function addTeam() {
        let success;

        ({ success, errors } = await createEntry(team, teamSchema, db.teams));

        if (success) goto("/teams");
    }


</script>
