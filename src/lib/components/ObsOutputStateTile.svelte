<script>
    import {
      ObsOutputState ,
    } from '$lib/stores/obs-store'

    export let state
</script>


<div
    class="state obs-state"
    class:started={state === ObsOutputState.Started}
    class:starting={state === ObsOutputState.Starting}
    class:stopping={state === ObsOutputState.Stopping}
    class:stopped={state === ObsOutputState.Stopped}
    >
    <slot></slot>
</div>


<style lang="postcss">
.obs-state {
    outline: 1px solid transparent;
    padding: 0.25em;
    border-radius: 0.25em;
}
.started {
    outline-color: lime;
}
.starting,
.stopping {
    outline-color: yellow;
}
.stopped {
    outline-color: orangered;
}
</style>
