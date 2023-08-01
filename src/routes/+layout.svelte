<script>
import "../app.postcss";
import { goto } from '$app/navigation'
import { base } from '$app/paths'

import {
  ObsConnectionState , obsConnectionState ,
  obsCurrentScene ,
  obsReplayBufferState , obsStreamingState , obsRecordingState ,
  obsTryConnect ,
} from '$lib/stores/obs-store'
import ObsOutputStateTile from "$lib/components/ObsOutputStateTile.svelte";
import { onMount } from "svelte";

onMount( () => {
  obsTryConnect()
} )
</script>

<div id="layout">
  <header>
    <button on:click={() => goto( `/${base}` )}>
      Home
    </button>
    <button on:click={() => goto( 'settings' )}>
      Settings
    </button>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <button
      class="obs-state"
      type="button"
      class:connected={$obsConnectionState === ObsConnectionState.Connected}
      class:connecting={$obsConnectionState === ObsConnectionState.Connecting}
      class:disconnected={$obsConnectionState === ObsConnectionState.Disconnected}
      class:disconnecting={$obsConnectionState === ObsConnectionState.Disconnecting}
      on:click={() => goto( 'settings' )}
      >
      {#if $obsConnectionState === ObsConnectionState.Connected}
        <ObsOutputStateTile>
          Scene: {$obsCurrentScene}
        </ObsOutputStateTile>
        <ObsOutputStateTile state={$obsStreamingState}>
          Streaming
        </ObsOutputStateTile>
        <ObsOutputStateTile state={$obsRecordingState}>
          Recording
        </ObsOutputStateTile>
        <ObsOutputStateTile state={$obsReplayBufferState}>
          Replay
        </ObsOutputStateTile>
      {:else}
        OBS - Disconnected
      {/if}
    </button>
  </footer>
</div>

<style lang="postcss">

  .obs-state {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1em;
    outline: 1px solid red;
    padding: 0.5em;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .obs-state {
    outline: 1px solid transparent;
    padding: 0.25em;
    border-radius: 0.25em;
  }
  .connected {
      outline-color: lime;
  }
  .connecting,
  .disconnecting {
      outline-color: yellow;
  }
  .disconnected {
      outline-color: orangered;
  }
</style>
