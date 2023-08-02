<style lang="postcss">
    .connected {
        outline: 1px solid green;
    }

    input[type="number"] {
    }

    /* Hide Arrows in port-input*/
    input[type="number"] {
        -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    textarea {
        width: 100%;
        height: auto;
        resize: none;
        font-size: 12px;
        line-height: 95%;
        white-space: pre;
        overflow-wrap: normal;
        overflow-x: scroll;
        font-family: "Source Code Pro", monospace;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
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
    <input autocomplete="off" required type="text" title="IP" placeholder="IP: 192.168.56.1" bind:value={$obsIp} />
    <input
        autocomplete="off"
        required
        type="number"
        pattern=""
        title="Port (default: 4455)"
        placeholder="Port (default: 4455)"
        bind:value={$obsPort}
    />
    <input
        autocomplete="off"
        type="password"
        title="Password (can be empty)"
        placeholder=""
        bind:value={$obsPassword}
        bind:this={node_obsPW}
    />
    <input
        type="checkbox"
        name="showPassword"
        title="Show Password"
        bind:checked={showPassword}
        on:change={showPassword ? (node_obsPW.type = "text") : (node_obsPW.type = "password")}
    />
    <textarea name="obsStatusLog" cols="10" rows="10" disabled bind:value={$obsStatusLog} />
</div>

<script>
    import { onMount } from "svelte";
    import {
        obsIp,
        obsPort,
        obsPassword,
        obsStatusLog,
        ObsConnectionState,
        obsConnectionState,
        obsTryConnect,
        obsToggleConnection,
    } from "$lib/stores/obs-store";

    let node_obsPW;
    let showPassword;

    function clearAll() {
        localStorage.clear();
        sessionStorage.clear();
    }

    onMount(() => {
        obsTryConnect();
    });
</script>
