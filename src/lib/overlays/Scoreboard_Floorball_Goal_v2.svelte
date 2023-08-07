<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .container {
        font-family: "Quantico", sans-serif;
        font-weight: bold;
        font-size: 175%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .scoreboard {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .board {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        justify-content: stretch;
    }

    .timer,
    .period {
        color: white;
        font-size: 125%;
        font-weight: normal;
    }

    .goal {
        font-size: 150%;
        border: 0.25em solid red;
        border-radius: 1em;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none;

        background-color: rgb(255, 255, 255);
        background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0.1em, transparent 0.1em),
            linear-gradient(to right, rgba(0, 0, 0, 0.15) 0.1em, transparent 0.1em);
        background-size: 0.4em 0.4em;

        display: grid;
        grid-template-columns: 1fr auto 1fr;

        .score {
            padding: 0.4em 0.25em;
            font-size: 150%;
            place-self: center;
        }
    }

    .team {
        background-color: white;
        height: 3em;
        align-self: center;
        overflow: hidden;
        align-self: self-end;
        margin-bottom: 0.5em;

        &.home {
            display: grid;
            justify-content: space-between;
            grid-template-columns: auto 1fr;
            border-top-left-radius: 2em;
            border-bottom-left-radius: 2em;
        }
        &.guest {
            display: grid;
            grid-template-columns: 1fr auto;
            justify-content: space-between;
            border-top-right-radius: 2em;
            border-bottom-right-radius: 2em;
        }

        &.home {
            color: black;
            background: linear-gradient(45deg, black 0% 15%, red 15% 25%, white 25% 100%);
        }
        &.guest {
            color: white;
            background: linear-gradient(-45deg, red 0% 15%, black 15% 100%);
        }

        img {
            height: 3em;
            object-fit: contain;
            padding: 0.1em 0.2em;
            z-index: 2;
        }
    }

    .name {
        min-width: 0; /* prevent the logo to overflow, change .name instead*/
        padding: 0 1em;
        place-self: center;
        white-space: nowrap;
        font-size: 170%;
    }
</style>

<div class="container" style="font-size: {scale}%">
    <div class="scoreboard">
        <div class="timer">13:37</div>
        <div class="period">1. Drittel</div>
        <div class="board">
            <div class="team home">
                <img src={logoHome} alt="" class="logo" />
                <div class="name">Black Lions Landsberg</div>
            </div>
            <div class="goal">
                <div class="score home">{$scoreHome}</div>
                <div class="score colon" />
                <div class="score guest">{$scoreGuest}</div>
            </div>
            <div class="team guest">
                <div class="name">Hannover 96</div>
                <img src={logoGuest} alt="" class="logo" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    import { scoreHome, scoreGuest } from "$lib/stores/floorball-store";

    import logoHome from "$lib/assets/logos/Logo Black Lions Landsberg 0.png";
    import logoGuest from "$lib/assets/logos/Logo Hannover 96 - SW 3.png";

    export let scale = 100
</script>
