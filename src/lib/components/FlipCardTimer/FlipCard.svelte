<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    :root {
        --col-label: white;
        --col-number: crimson;
        --col-card: #444;
        --col-hinge: #666;
    }

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;

        font-family: "Red Hat Text", sans-serif;
        /* font-size: 150%; */
        font-weight: 900;
        justify-content: center;
        align-items: center;

    }

    p {
        color: var(--col-label);
        /* font-size: 1.4rem; */
        letter-spacing: 0.4rem;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .top-front,
    .top-flip,
    .bottom-front,
    .bottom-flip {
        display: flex;
        justify-content: center;
        overflow: hidden;
        padding: 2.5em 1.5em;
        height: 0.875em;
        line-height: 1;
    }

    .top-front,
    .top-flip {
        background-color: var(--col-card);
        border-bottom: 1px solid var(--col-hinge);
        filter: brightness(85%);
        border-radius: 0.25em 0.25em 0 0;
    }

    .top-flip {
        position: absolute;
        width: 100%;
        top: 0;
        animation: flip-top 0.25s ease-in;
        transform-origin: bottom;
        transform: perspective(200px) rotateX(0);
    }

    @keyframes flip-top {
        100% {
            transform: rotateX(-90deg);
        }
    }

    .bottom-front {
        position: relative;
    }

    .bottom-front,
    .bottom-flip {
        display: flex;
        align-items: end;
        background-color: var(--col-card);
        border-radius: 0 0 0.25em 0.25em;
    }

    .bottom-flip {
        position: absolute;
        width: 100%;
        bottom: 0;
        animation: flip-bottom 0.25s ease-out 0.25s;
        transform-origin: top;
        transform: perspective(20em) rotateX(90deg);
    }

    @keyframes flip-bottom {
        100% {
            transform: rotateX(0deg);
        }
    }

    span {
        display: inline-block;
        color: var(--col-number);
        min-width: 3.5rem;
        font-size: 5em;
        height: 1em;
        text-align: center;
    }

    /* middle hinge */
    :is(.top-front, .top-flip, .bottom-front, .bottom-flip)::before,
    :is(.top-front, .top-flip, .bottom-front, .bottom-flip)::after {
        --size: 12px;
        content: "";
        position: absolute;
        width: var(--size);
        height: var(--size);
        background-color: var(--col-hinge);
        border-radius: 50%;
        z-index: 1;
    }
    :is(.top-front, .top-flip)::before {
        bottom: 0;
        left: 0;
        transform: translate(-50%, 50%);
    }
    :is(.top-front, .top-flip)::after {
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
    }
    :is(.bottom-front, .bottom-flip)::before {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }
    :is(.bottom-front, .bottom-flip)::after {
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    }

</style>

<div class="container">
    {#key number}
        <div class="wrapper">
            <div class="top-front">
                {#each topFront as num}
                    <span>{num}</span>
                {/each}
            </div>
            <div class="top-flip" on:animationstart={topFlipStart} on:animationend={topFlipEnd}>
                {#each topFlip as num}
                    <span>{num}</span>
                {/each}
            </div>
            <div class="bottom-front">
                {#each bottomFront as num}
                    <span>{num}</span>
                {/each}
            </div>
            <div class="bottom-flip" on:animationend={bottomFlipEnd} on:animationstart={bottomFlipStart}>
                {#each bottomFlip as num}
                    <span>{num}</span>
                {/each}
            </div>
        </div>
    {/key}
    <p>{name}</p>
</div>

<script lang="ts">
    import { onMount } from "svelte";
    import "dseg/css/dseg.css";
    import { onInterval } from "./onInterval";

    export let callback: () => void;
    export let number: number;
    export let name: string;

    $: numbers = calculateLength(number);

    let topFront: string[] = [];
    let bottomFront: string[] = [];
    let topFlip: string[] = [];
    let bottomFlip: string[] = [];

    const calculateLength = (num: number) => {
        let arr = num.toString().split("");
        let res = arr.length === 1 ? ["0", ...arr] : arr;

        return res;
    };

    const topFlipStart = () => {
        topFront = numbers;
    };

    const topFlipEnd = () => {
        topFlip = numbers;
    };

    const bottomFlipStart = () => {
        bottomFlip = numbers;
    };

    const bottomFlipEnd = () => {
        bottomFront = numbers;
    };

    onMount(() => {
        topFront = numbers;
        bottomFront = numbers;
        topFlip = numbers;
        bottomFlip = numbers;
    });

    onInterval(callback, 1000);
</script>
