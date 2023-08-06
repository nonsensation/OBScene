<style lang="postcss">
    .image-upload {
        height: 100%;
        height: 15rem;

        input {
            display: none;
        }

        label {
            display:flex;
            height: 100%;
        }
        img {
            width: 100%;
            height: 100%;

            object-fit: contain;
            cursor: pointer;
            border-radius: 0.25rem;
            border: 1px solid gray;

            background: gray
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
            background-size: 1rem 1rem;
        }
    }
</style>

<div class="image-upload">
    <label for="img-input">
        <img bind:this={img} src="" alt="" />
    </label>
    <input
        {name}
        id="img-input"
        type="file"
        accept="image/*"
        aria-label="Logo-Upload"
        bind:this={input}
        on:change={() => change()}
    />
</div>

<script>
    let img;
    let input;

    export let blob;
    export let name = 'image';

    function change() {
        console.log("change");

        let file = input.files[0];
        let reader = new FileReader();

        reader.onloadend = async function () {
            blob = new Blob([reader.result], { type: file.type });
            img.src = URL.createObjectURL(blob);
        };
        reader.readAsArrayBuffer(file);
    }
</script>
