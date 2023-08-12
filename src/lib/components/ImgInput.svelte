<style lang="postcss">
    .image-upload {
        width: 100%;
        border-radius: var(--border-radius);

        input {
            display: none;
        }

        label {
            display: flex;
            height: 100%;
        }
        img {
            width: 100%;
            height: 100%;
            max-height: 15rem;
            min-height: 15rem;

            object-fit: contain;
            cursor: pointer;
            border-radius: var(--border-radius);
            border: var(--border);

            background: gray
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
            background-size: 1rem 1rem;

            &:hover {
                outline: var(--hover-outline);
            }
            &:focus {
                outline: var(--focus-outline);
            }
        }
    }
    img.invalid {
        background: lavenderblush
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
        background-size: 1rem 1rem;
    }
    .error {
        color: crimson;
        /* font-size: 80%;
        line-height: 80%; */

        &.error {
            margin: 0.5em 0;
        }
    }
    .label-text {
        font-size: 90%;
    }
</style>

<div class="form-control image-upload">
    <span class="label-text">{label}</span>
    <label for="img-input" title="Logo-Upload">
        <img bind:this={img} class:invalid={errors} src="" alt="" />
    </label>
    <input
        {name}
        id="img-input"
        type="file"
        accept="image/*"
        aria-label="Logo-Upload"
        bind:this={input}
        on:change={change}
    />

    {#if errors}
        <div class="errors">
            {#each errors as error}
                <p class="error">{error}</p>
            {/each}
        </div>
    {/if}
</div>

<script>
    let img;
    let input;

    export let blob;
    export let name = "image";
    export let errors;
    export let label = ""

    function change(event) {
        const target = event.target;
        const files = target.files;

        if (files.length > 0) {
            errors = undefined
            let file = files[0];
            let reader = new FileReader();
            reader.onloadend = async () => (blob = new Blob([reader.result], { type: file.type }));
            reader.readAsArrayBuffer(file);

            img.src = URL.createObjectURL(file);
        }
    }
</script>
