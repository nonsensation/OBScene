<div>
    <p>{status}</p>

    <form action="?/create" use:enhance>
        <ImgInput bind:blob bind:name={imgName} />
        <fieldset>
            <legend>Add new friend</legend>
            <label>
                Name:
                <input type="text" bind:value={teamName} required />
            </label>
            <br />
        </fieldset>
        <button on:click={addTeam}>Add Team</button>
    </form>

</div>

<script>
    import { db } from "$lib/database/dexie-db";
    import ImgInput from "$lib/components/ImgInput.svelte";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    import { TeamTable } from "$lib/database/dexie-db";

    let status = "";
    let teamName = "";

    let blob;
    let imgName = 'logo'

    async function addTeam() {
        console.assert(blob, "Blob is empty!");

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
