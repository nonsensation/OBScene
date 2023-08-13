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
        grid-template-columns: auto 1fr auto;

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
            font-size: 200%;
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
            <div bind:this={period} class="period">1st Period</div>
            <div bind:this={timer} class="timer">13:37</div>
            <div bind:this={special} class="special">Empty Net</div>
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

<script>
    import { scoreboard } from "$lib/stores/scoreboard-store";
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";

    export let scale = 100;

    let isMounted = false;
    let timer, period, special;
    let scoreHome, nameHome, teamHome, logoHome;
    let scoreGuest, nameGuest, teamGuest, logoGuest;

    let teamHomeModel;
    let teamGuestModel;

    $: teamHomeModel = liveQuery(() => db.teams.get({ id: $scoreboard.home.teamId }));
    $: teamGuestModel = liveQuery(() => db.teams.get({ id: $scoreboard.guest.teamId }));

    $: if ($teamHomeModel) logoHome = URL.createObjectURL($teamHomeModel.logo);
    $: if ($teamGuestModel) logoGuest = URL.createObjectURL($teamGuestModel.logo);

    $: if (teamHome) teamHome.style.backgroundColor = $scoreboard.home.primaryColor;
    $: if (teamHome) teamHome.style.borderColor = $scoreboard.home.secondaryColor;
    $: if (nameHome) nameHome.textContent = $scoreboard.home.name;
    $: if (nameHome) nameHome.style.color = $scoreboard.home.textColor;
    $: if (scoreHome) scoreHome.textContent = $scoreboard.home.score;
    $: if (scoreHome) scoreHome.style.color = $scoreboard.home.scoreColor;

    $: if (teamGuest) teamGuest.style.backgroundColor = $scoreboard.guest.primaryColor;
    $: if (teamGuest) teamGuest.style.borderColor = $scoreboard.guest.secondaryColor;
    $: if (nameGuest) nameGuest.textContent = $scoreboard.guest.name;
    $: if (nameGuest) nameGuest.style.color = $scoreboard.guest.textColor;
    $: if (scoreGuest) scoreGuest.textContent = $scoreboard.guest.score;
    $: if (scoreGuest) scoreGuest.style.color = $scoreboard.guest.scoreColor;

    $: if (timer) timer.textContent = $scoreboard.time.min + ":" + $scoreboard.time.sec;
    $: if (period) period.textContent = $scoreboard.period;
    $: if (special) special.textContent = $scoreboard.special;
</script>
