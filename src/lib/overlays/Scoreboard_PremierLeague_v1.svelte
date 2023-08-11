<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Quicksand:500,600,700&display=swap");
    .container {
        font-family: "Quantico", sans-serif;
        font-family: "Quicksand", sans-serif;
        font-weight: normal;
        font-size: 300%;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .scoreboard {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        justify-content: center;
        font-size: 175%;
        position: relative;
        color: white;
        border-radius: 1em;;
    }

    .team,
    .score,
    .time,
    .period {
        background-color: #34003a;
        height: 100%;
        padding: 0.25em 0.75em;
        z-index: 1;
    }

    .score {
        color: black;
        background-color: #00fc8a;
    }

    .timer,
    .time,
    .period {
        color: #34003a;
        background-color: white;
    }

    .team,
    .score {
        grid-row: 2;
    }

    .team {
        &.home {
            border-left: 8px solid white;
        }
        &.guest {
            border-right: 8px solid red;
        }

        box-shadow: 0 0 10px 3px black;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #34003a;

        height: 100%;
        box-shadow: 0 0 10px 3px black;
        z-index: 2;

        font-size: 120%;
        font-weight: bold;

        padding: 0 0.5em;

        .divider {
            padding: 0 0.25em;
        }
    }

    .timer {
        grid-column: 2 / 3;
        box-shadow: 0 0 10px 3px black;
        overflow: visible;
        display: flex;
        justify-content: stretch;
        flex-direction: column;
        /* padding: 0.25em 0.5em; */
        font-weight: bold;
    }
    .period {
        line-height: 90%;
        font-size: 50%;
        background-color: #34003a;
        background-color: white;
        width: 100%;
        padding: 0.5em 1em;
        color: white;
        color: #34003a;
        box-shadow: 0 0 10px 3px black;
        z-index: 0;
        /* display: none; */
    }
    .time {
        color: #34003a;
        background-color: #34003a;
        color: white;
        font-size: 90%;
        line-height: 80%;
        padding: 0.5em 1em;
        box-shadow: 0 0 10px 3px black;
        /* display: none; */
    }

    .logo {
        position: relative;
        grid-column: 2 / 3;
        z-index: 0;
        img {
            /* border: 1px solid red; */
            max-width: 4em;
            position: absolute;
            transform: translateX(-50%) translateY(-80%);
            filter: drop-shadow(0px 0px 5px black);
        }
    }
</style>

<div class="container" style="font-size: {scale}%">
    <div class="scoreboard">
        <div class="logo">
            <img src={FD_Logo} alt="" />
        </div>
        <div bind:this={teamHome} class="team home">
            <div bind:this={nameHome} class="name">Wildfire Tigers</div>
        </div>
        <div class="score">
            <div bind:this={scoreHome} class="">0</div>
            <div class="divider">-</div>
            <div bind:this={scoreGuest} class="">0</div>
        </div>
        <div bind:this={teamGuest} class="team guest">
            <div bind:this={nameGuest} class="name">Stealth Strikers</div>
        </div>
        <div class="timer">
            <div class="time">13:37</div>
            <div class="period">3. Drittel</div>
        </div>
    </div>
</div>

<script type="text/javascript">
    import { onMount } from "svelte";
    import { scoreboard } from "$lib/stores/scoreboard-store";

    import FD_Logo from "$lib/assets/logos/Floorball Deutschland Pokal 3.png";

    export let scale = 100;

    let scoreHome, nameHome, scoreGuest, nameGuest, teamHome, teamGuest;

    onMount(() => {
        teamHome.style.borderColor = $scoreboard["HOME"].primaryColor;
        nameHome.textContent = $scoreboard["HOME"].Name;
        scoreHome.textContent = $scoreboard["HOME"].score;
        teamGuest.style.borderColor = $scoreboard["GUEST"].primaryColor;
        nameGuest.textContent = $scoreboard["GUEST"].Name;
        scoreGuest.textContent = $scoreboard["GUEST"].score;
    });
</script>
