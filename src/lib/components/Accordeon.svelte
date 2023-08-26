<style lang="postcss">
    details {
        border: var(--border);
        border-radius: var(--border-radius);
        width: 100%;

        summary {
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            padding: 0.5em;
            cursor: pointer;
            font-weight: bold;

            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            :global([slot="head"]) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
        }

        &[open] {
            summary {
                border-bottom: var(--border);
                background-color: gainsboro;
            }
        }

        :global([slot="content"]) {
            padding: 1em;
        }

        :global([slot="footer"]) {
            border: none;
            border-top: var(--border);
            border-top-left-radius: none;
            border-top-right-radius: none;

            padding: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }
</style>

<details {open}>
    <summary>
        <slot name="head" />
    </summary>
    <slot name="content" />
    <slot name="footer" />
</details>

<script>
    export let open = undefined
</script>
