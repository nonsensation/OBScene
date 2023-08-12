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

<Meta title="Add a new Team"/>
<div>
    <p>{status}</p>

    <form action="?/create">
        <fieldset>
            <legend>Team</legend>

            <Input
                label="Name:"
                title="Name of the team"
                bind:value={teamName}
                id="teamName"
                type="text"
                errors={errors?.["Name"]}
            />
            <ImgInput bind:blob bind:name={imgName} label="Logo:" errors={errors?.["Logo"]} />
            <Input
                label="ShortName:"
                title="A short name of the team"
                bind:value={shortName}
                id="shortName"
                type="text"
                errors={errors?.["ShortName"]}
            />
            <button on:click|preventDefault={addTeam}>Add Team</button>

        </fieldset>
    </form>
</div>

<script>
    import { db } from "$lib/database/dexie-db";
    import { Meta, Input, ImgInput } from "$lib/components";
    import { TeamSchema } from "$lib/database/models";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    import { TeamTable } from "$lib/database/dexie-db";

    let status = "";
    let teamName = "";
    let shortName = "";

    let nameErrors

    let blob = new Blob();
    let imgName = "logo";

    $: console.log(teamName);

    let validationResult ;
    let errors

    async function addTeam() {
        console.assert(blob, "Blob is empty!");

        validationResult = TeamSchema.safeParse( {
            Name: teamName ,
            ShortName: shortName ,
            Logo: blob ,
        } );

        if( !validationResult.success )
        {
            errors = validationResult.error.flatten().fieldErrors
            console.error( 'Errors: ' + JSON.stringify(errors) )

            return;
        }
        else
        {
            errors = null
            console.error( 'result: ' + JSON.stringify(validationResult) )
        }

        return;

        try {
            const id = await db.teams.add({
                name: teamName,
                logo: blob,
            });

            status = `Team ${teamName} successfully added. Got id ${id}`;

            goto("/teams");
        } catch (error) {
            status = `Failed to add ${teamName}: ${error}`;
        }
    }

    // function onImageChange() {
    //     let file = inputLogo.files[0];
    //     let reader = new FileReader();

    //     reader.onloadend = async function () {
    //         blob = new Blob([reader.result], { type: file.type });
    //         imgLogo.src = URL.createObjectURL(blob);
    //     };
    //     reader.readAsArrayBuffer(file);
    // }
</script>
