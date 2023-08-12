<style lang="postcss">
    .form-control {
        width: 100%;
    }

    input {
        font-family: "Ubuntu", sans-serif;
        background-color: transparent;
        border: var(--border);
        border-radius: var(--border-radius);
        width: 100%;
        padding: 0.5em 1em;

        &:focus {
            outline: var(--focus-outline);
        }
        &:hover {
            outline: var(--hover-outline);
        }
    }

    .label-text {
        font-size: 90%;
    }

    .error {
        color: crimson;
        font-size: 80%;
        line-height: 80%;

        &.error {
            margin: 0.5em 0;
        }
    }

    .invalid {
        background-color: lavenderblush;
    }
</style>

<div class="form-control">
    <label for={id} class="label">
        <span class="label-text">{label}</span>
    </label>
    <input class="input" class:invalid={errors?.length > 0 ?? false} use:typeAction bind:value {placeholder} {title} {id} name={id} {required} {disabled} />
    {#if errors}
        <div class="errors">
            {#each errors as error}
                <p class="error">{error}</p>
            {/each}
        </div>
    {/if}
</div>

<script lang="ts">
    type InputTypes = "text" | "password";

    export let type: InputTypes = "text";
    export let value: string = "";
    export let placeholder: string = "";
    export let id: string = "";
    export let label: string = "";
    export let title: string = "";
    export let errors: string[] = null;
    export let disabled: boolean = false;
    export let required: boolean = false;

    // See: https://stackoverflow.com/questions/57392773
    function typeAction(node) {
        node.type = type;
    }
</script>
