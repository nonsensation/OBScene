<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .container {
        font-family: "Quantico", sans-serif;
        font-weight: bold;
        font-size: 175%;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .scoreboard {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        background-color: black;
        width: 100%;
        padding: 0.05em 0.3em;

        .period,
        .timer,
        .special {
            color: white;
            font-weight: normal;
        }
        .period {
            justify-self: start;
        }
        .timer {
            justify-self: center;
        }
        .special {
            justify-self: end;
        }
    }

    .board {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .team {
        height: 3em;
        overflow: hidden;
        display: grid;
        grid-template-columns: auto auto auto;

        &.home {
            color: black;
            background: white;
            border-bottom: 3px solid red;
        }
        &.guest {
            color: white;
            background: teal;
            border-bottom: 3px solid darkmagenta;
        }

        .name {
            min-width: 0; /* prevent the logo to overflow, change .name instead*/
            padding: 0 1em;
            place-self: center;
            white-space: nowrap;
            font-size: 170%;
        }
        .score {
            /* outline: 1px solid green; */
            font-size: 175%;
            place-self: center;
            padding: 0 0.5em;
        }

        img {
            height: 3em;
            object-fit: contain;
            padding: 0.1em 0.2em;
            z-index: 2;
        }
    }
</style>

<div class="container" style="font-size: {scale}%">
    <div class="scoreboard">
        <div class="top">
            <div class="period">1st Period</div>
            <div class="timer">13:37</div>
            <div class="special">Empty Net</div>
        </div>
        <div class="board">
            <div bind:this={teamHome} class="team home">
                <img class="logo" src={logoHome} alt="" />
                <div bind:this={nameHome} class="name">Home</div>
                <div bind:this={scoreHome} class="score">0</div>
            </div>
            <div bind:this={teamGuest} class="team guest">
                <div bind:this={scoreGuest} class="score">0</div>
                <div bind:this={nameGuest} class="name">Guest</div>
                <img class="logo" src={logoGuest} alt="" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    import { onMount } from "svelte";
    import { scoreboard } from "$lib/stores/scoreboard-store";
    import logoHome from "$lib/assets/logos/Logo-Home.png";
    import logoGuest from "$lib/assets/logos/Logo-Guest.png";

    export let scale = 100;

    let scoreHome, nameHome, scoreGuest, nameGuest, teamHome, teamGuest;

    onMount(() => {
        teamHome.style.backgroundColor = $scoreboard["HOME"].primaryColor;
        teamHome.style.borderColor = $scoreboard["HOME"].secondaryColor;
        nameHome.textContent = $scoreboard["HOME"].name;
        nameHome.style.color = $scoreboard["HOME"].textColor;
        scoreHome.textContent = $scoreboard["HOME"].score;
        scoreHome.style.color = $scoreboard["HOME"].scoreColor;

        teamGuest.style.backgroundColor = $scoreboard["GUEST"].primaryColor;
        teamGuest.style.borderColor = $scoreboard["GUEST"].secondaryColor;
        nameGuest.textContent = $scoreboard["GUEST"].name;
        nameGuest.style.color = $scoreboard["GUEST"].textColor;
        scoreGuest.textContent = $scoreboard["GUEST"].score;
        scoreGuest.style.color = $scoreboard["GUEST"].scoreColor;
    });
</script>
