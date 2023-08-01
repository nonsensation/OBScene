<style lang="postcss">
    textarea {
        resize: none;
        width: 100%;
        height: auto;
    }

    .connected {
        outline: 1px solid green;
    }

    input[type=number] {
        margin: 0;
    }

    /* Hide Arrows in port-input*/
    input[type='number'] {
        -moz-appearance:textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    textarea {
        resize: none;

    }

</style>

<div>
    <button
        type="button"
        on:click={obsToggleConnection}
        class:connected={$obsConnectionState === ObsConnectionState.Connected}
        class:connecting={$obsConnectionState === ObsConnectionState.Connecting}
    >
        {#if $obsConnectionState === ObsConnectionState.Connected}
            Disconnect
        {:else if $obsConnectionState === ObsConnectionState.Connecting}
            Connecting...
        {:else if $obsConnectionState === ObsConnectionState.Disconnected}
            Connect
        {:else}
            ERROR: ({$obsConnectionState})
        {/if}
    </button>
    <input
        autocomplete="off"
        required
        type="text"
        title="IP"
        placeholder="IP: 192.168.56.1"
        bind:value={$obsIp}
    >
    <input
        autocomplete="off"
        required
        type="number"
        pattern=""
        title="Port (default: 4455)"
        placeholder="Port (default: 4455)"
        bind:value={$obsPort}
    >
    <input
        autocomplete="off"
        type="password"
        title="Password (can be empty)"
        placeholder=""
        bind:value={$obsPassword}
        bind:this={node_obsPW}
    >
    <input
        type="checkbox"
        name="showPassword"
        title="Show Password"
        bind:checked={showPassword}
        on:change={showPassword ? node_obsPW.type = "text" : node_obsPW.type = "password"}
    >
    <textarea
        name="obsStatusLog"
        cols="10"
        rows="100"
        disabled
        bind:value={$obsStatusLog}
    />
</div>

<script>
import { onMount } from "svelte";
import {
    obsIp ,
    obsPort ,
    obsPassword ,
    obsStatusLog ,
    ObsConnectionState , obsConnectionState ,
    obsTryConnect , obsToggleConnection ,
} from "$lib/stores/obs-store"


let node_obsPW
let showPassword

function clearAll()
{
    localStorage.clear()
    sessionStorage.clear()
}

onMount( () => {
    obsTryConnect()
} )

</script>