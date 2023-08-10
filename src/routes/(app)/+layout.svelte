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
        gap: 0.5em;
    }

    header,
    footer {
        padding: 0.2em 0.5em;
        width: 100%;
        box-shadow: 0px 0px 0.5em black;
        color: white;
    }

    header,
    footer {
        align-content: space-between;
        button {
            width: 100%;
            border: none;

            &.active {
                outline: 2px solid slateblue;
                /* background-color: rgba(0, 0, 0, 0.138); */
            }
        }
        user-select: none;
    }

    footer {
    }

    main {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 0.5em;
        overflow-y: auto;
    }

    .obs-state {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1em;
        padding: 0.5em;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25em;
        border-radius: 0.25em;
    }
</style>

<Meta title="lol" />
<div id="layout">
    <header class="flex">
        {#each navItems as navItem}
            <a href={navItem.path} class:active={path === navItem.path}>
                <Icon title={navItem.text} name={navItem.icon} />
            </a>
        {/each}
    </header>

    {#key path}
        <main in:fade>
            <slot />
        </main>
    {/key}

    <footer class="flex">
        <button
            class="obs-state flex"
            type="button"
            class:connected={$obsConnectionState === ObsConnectionState.Connected}
            class:connecting={$obsConnectionState === ObsConnectionState.Connecting}
            class:disconnected={$obsConnectionState === ObsConnectionState.Disconnected}
            class:disconnecting={$obsConnectionState === ObsConnectionState.Disconnecting}
            on:click={() => goto("/settings")}
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
    import { fade, blur, slide, scale, draw, crossfade } from "svelte/transition";
    import "../../app.postcss";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
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
    import Meta from "$lib/components/Meta.svelte";
    import ObsOutputStateTile from "$lib/components/ObsOutputStateTile.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        obsTryConnect();
    });

    let path;

    $: path = $page.url.pathname;

    const navItems = [
        {
            text: "Home",
            icon: "home",
            path: "/",
        },
        {
            text: "Match",
            icon: "trophy",
            path: "/match/",
        },
        {
            text: "Floorball",
            icon: "sports_hockey",
            path: "/floorball/",
        },
        {
            text: "Sports",
            icon: "sports",
            path: "/sports/",
        },
        {
            text: "Teams",
            icon: "groups",
            path: "/teams/",
        },
        {
            text: "Overlays",
            icon: "preview",
            path: "/overlays/",
        },
        {
            text: "Settings",
            icon: "settings",
            path: "/settings/",
        },
    ];
</script>
