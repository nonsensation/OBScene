<style lang="postcss">
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

    .form {
        width: 100%;
        display: flex;
        justify-content: stretch;
        align-content: stretch;
        gap: 0.2em;

        input {
            text-align: center;
            width: 100%;
        }
    }

    button {
        width: 100%;
    }
</style>

<div>
    <button type="button" on:click={() => obsToggleConnection()}>
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

    <div class="form">
        <input autocomplete="off" required type="text" title="IP" placeholder="IP: 192.168.0.1" bind:value={$obsIp} />
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
            placeholder="Password (can be empty)"
            bind:value={$obsPassword}
            bind:this={node_obsPW}
        />
    </div>

    <textarea name="obsStatusLog" cols="10" rows="15" disabled bind:value={$obsStatusLog} />
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
