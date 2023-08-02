<style lang="postcss">
    #layout {
        display: grid;
        grid-template-rows: auto 1fr auto;
        justify-items: center;
        width: 100%;
        height: 100%;
    }

    .flex {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: white;
    }

    header,
    footer {
        padding: 0 0.2em;
        width: 100%;
        z-index: 0;
        box-shadow: 0px 0px 10px black;
    }

    header {
    }

    footer {
    }

    main {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        border-top: 3px solid;
        border-bottom: 3px solid;
        border-color: red;
        z-index: 1;
        padding: 0.5em;
        overflow-y: auto;
    }

    .obs-state {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1em;
        /* outline: 1px solid red; */
        padding: 0.5em;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25em;
        border-radius: 0.25em;
    }
    .connected {
    }
    .connecting,
    .disconnecting {
    }
    .disconnected {
    }
</style>

<div id="layout">
    <header class="flex">
        <button on:click={() => goto(`/${base}`)}>
            <Icon title="Home" name="home" />
        </button>
        <button on:click={() => goto("settings")}>
            <Icon title="Settings" name="settings" />
        </button>
    </header>

    <main>
        <slot />
    </main>
    <footer class="flex">
        <button
            class="obs-state flex"
            type="button"
            class:connected={$obsConnectionState === ObsConnectionState.Connected}
            class:connecting={$obsConnectionState === ObsConnectionState.Connecting}
            class:disconnected={$obsConnectionState === ObsConnectionState.Disconnected}
            class:disconnecting={$obsConnectionState === ObsConnectionState.Disconnecting}
            on:click={() => goto("settings")}
        >
            {#if $obsConnectionState === ObsConnectionState.Connected}
                <ObsOutputStateTile>
                    <Icon slot="inactive" title="Scene: {$obsCurrentScene}" name="photo_frame" />
                </ObsOutputStateTile>

                <ObsOutputStateTile state={$obsStreamingState}>
                    <Icon slot="active" title="Livestream: Active" name="videocam" />
                    <Icon slot="inactive" title="Livestream: Inactive" name="videocam_off" />
                </ObsOutputStateTile>
                <ObsOutputStateTile state={$obsRecordingState}>
                    <Icon slot="active" title="Recording: Active" name="photo_camera" />
                    <Icon slot="inactive" title="Recording: Inactive" name="no_photography" />
                </ObsOutputStateTile>
                <ObsOutputStateTile state={$obsReplayBufferState}>
                    <Icon slot="active" title="Replay Buffer: Active" name="frame_person" />
                    <Icon slot="inactive" title="Replay Buffer: Inactive" name="frame_person_off" />
                </ObsOutputStateTile>
            {:else}
                <ObsOutputStateTile>
                    <Icon slot="inactive" title="OBS - Disconnected" name="wifi_off" />
                </ObsOutputStateTile>
            {/if}
        </button>
    </footer>
</div>

<script>
    import "../app.postcss";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import {
        ObsConnectionState,
        obsConnectionState,
        obsCurrentScene,
        ObsOutputState,
        obsReplayBufferState,
        obsStreamingState,
        obsRecordingState,
        obsTryConnect,
    } from "$lib/stores/obs-store";
    import ObsOutputStateTile from "$lib/components/ObsOutputStateTile.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        obsTryConnect();
    });
</script>
