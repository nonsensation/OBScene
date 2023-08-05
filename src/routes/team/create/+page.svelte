<div>
    <p>{status}</p>
    <fieldset>
        <legend>Add new friend</legend>
        <label>
            Name:
            <input type="text" bind:value={teamName} />
        </label>
        <br />

        <div class="image-upload">
            <label for="inputLogo">
                <img bind:this={imgLogo} src="" />
            </label>
            <input id="inputLogo" bind:this={inputLogo} on:change={() => onImageChange()} type="file" />
        </div>

        <button on:click={addTeam}>Add Team</button>
    </fieldset>
</div>

<script>
    import { db } from "$lib/database/dexie-db";
    import { goto } from "$app/navigation";
    import { TeamTable } from "../../../lib/database/dexie-db";

    let status = "";
    let teamName = "";

    let imgLogo;
    let inputLogo;

    let blob;

    async function addTeam() {
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

    function onImageChange() {
        let file = inputLogo.files[0];
        let reader = new FileReader();

        reader.onloadend = async function () {
            blob = new Blob([reader.result], { type: file.type });
            imgLogo.src = URL.createObjectURL(blob);
        };
        reader.readAsArrayBuffer(file);
    }

</script>
