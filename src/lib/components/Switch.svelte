<style lang="postcss">
    .switch {
        position: relative;
        display: inline-block;
        width: 3em;
        height: 1.5em;

        & input {
            opacity: 0;
            width: 0;
            height: 0;

            &:checked + .slider {
                background-color: lightseagreen;
            }

            &:checked + .slider:before {
                transform: translateX(1.25em);
            }
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: salmon;
            transition: 0.4s;
            border-radius: 1em;

            &:before {
                position: absolute;
                content: "";
                height: 1em;
                width: 1em;
                left: 0.25em;
                bottom: 0.25em;
                background-color: white;
                transition: 0.4s;
                border-radius: 50%;
            }
        }
    }
</style>

<label class="switch">
    <input type="checkbox" bind:checked/>
    <span class="slider" />
</label>

<script>
    export let checked
</script>
