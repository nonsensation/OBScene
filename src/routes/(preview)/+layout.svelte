<style lang="postcss">
    #layout {
        display: grid;
        grid-template-rows: 1fr;
        justify-items: center;
        width: 100%;
        height: 100%;
    }

    .preview {
        background: gray
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
        background-size: 1rem 1rem;
    }

    main {
        height: 100%;
        width: 100%;
    }
</style>

<div id="layout">
    <main class:preview={!window.obsstudio}>
        <slot />
    </main>
</div>

<script>
    import "../../app.postcss";
</script>
