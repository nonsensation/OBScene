<style lang="postcss">
    .obs-state {
        padding: 0 0.25em;
        border-radius: 0.25em;
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
    }
    /* .started {
        color: (--color-started);
    }
    .starting {
        color: (--color-starting);
    }
    .stopping {
        color: (--color-starting);
    }
    .stopped {
        color: (--color-stopped);
    } */
</style>

<div
    class="state obs-state"
    class:started={state === ObsOutputState.Started}
    class:starting={state === ObsOutputState.Starting}
    class:stopping={state === ObsOutputState.Stopping}
    class:stopped={state === ObsOutputState.Stopped}
    {title}
>
    {#if state && state === ObsOutputState.Started}
        <slot name="active"/>
    {:else}
        <slot name="inactive"/>
    {/if}
</div>

<script>
    import { ObsOutputState } from "$lib/stores/obs-store";

    export let state;
    export let title;
</script>
