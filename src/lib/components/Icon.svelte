<style>
    @import "material-symbols";

    div {
        display: flex;
        flex-direction: column;
        /* color: white; */
    }

    .active {
        color: var(--color-started);
    }
    .inactive {
        color: var(--color-stopped);
    }

    .label {
        font-size: 70%;
    }

    .material-symbols-rounded {
        /* color: white; */
    }
</style>

<div {title} class:active={slot === "active"} class:inactive={slot === "inactive"}>
    <span class="material-symbols-rounded">
        {name}
    </span>
    <span class="label">
        <!-- Check if slot is empty -->
        <!-- See: https://github.com/sveltejs/svelte/issues/2106#issuecomment-501000254 -->
        {#if $$props.$$slots}
            <slot />
        {:else}
            {title}
        {/if}
    </span>
</div>

<script>
    export let title;
    export let name;
    export let slot;
</script>
