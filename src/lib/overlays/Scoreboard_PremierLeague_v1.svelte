<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Quicksand:500,600,700&display=swap");
    .container {
        font-family: "Quantico", sans-serif;
        /* font-family: "Quicksand", sans-serif; */
        font-weight: bold;
        font-size: 300%;
        width: 100%;
        height: 100%;

        display: flex;
        place-content: center;
        place-items: center;
    }

    .scoreboard {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        justify-content: center;
        font-size: 175%;
        position: relative;
        color: white;
        border-radius: 1em;
    }

    .team,
    .score,
    .time,
    .period {
        background-color: #34003a;
        height: 100%;
        padding: 0.25em 0.75em;
        z-index: 1;
        display: flex;
        place-content: center;
        place-items: center;
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
        position: relative;
        /* overflow: hidden; */

        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: var(--bg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            background-size: 50%;
            z-index: -1;
            opacity: 0.1;
            filter: grayscale();
            /* mix-blend-mode: difference; */
        }

        &.home {
            border-left: 8px solid white;
            &:before {
                /* background-position: 0%; */
            }
        }
        &.guest {
            border-right: 8px solid red;
            &:before {
                /* background-position: 100%; */
            }
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
        text-align: center;
    }
    .time {
        background-color: #34003a;
        color: white;
        text-align: center;
        font-size: 90%;
        line-height: 80%;
        padding: 0.5em 1em;
        box-shadow: 0 0 10px 3px black;

    }

    .logo {
        position: relative;
        grid-column: 2 / 3;
        z-index: 0;
        img {
            /* border: 1px solid red; */
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transform: translateY(-85%);
            filter: drop-shadow(0px 0px 5px black) drop-shadow(0px 0px 10px black);
        }
    }

    .divider {
        color: transparent;
        mix-blend-mode: difference;
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
        <div class="score" bind:this={score}>
            <div bind:this={scoreHome} class="scores">0</div>
            <div class="divider scores">-</div>
            <div bind:this={scoreGuest} class="scores">0</div>
        </div>
        <div bind:this={teamGuest} class="team guest">
            <div bind:this={nameGuest} class="name">Stealth Strikers</div>
        </div>
        <div class="timer">
            <div bind:this={timer} class="time">13:37</div>
            <div bind:this={period} class="period">3. Drittel</div>
        </div>
    </div>
</div>

<script type="text/javascript">
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";
    import { scoreboard } from "$lib/stores/scoreboard-store";
    import FD_Logo from "$lib/assets/logos/Floorball Deutschland Pokal 3.png";

    export let scale = 100;

    let timer, period, score;
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

    $: if (teamGuest) teamGuest.style.backgroundColor = $scoreboard.guest.primaryColor;
    $: if (teamGuest) teamGuest.style.borderColor = $scoreboard.guest.secondaryColor;
    $: if (nameGuest) nameGuest.textContent = $scoreboard.guest.name;
    $: if (nameGuest) nameGuest.style.color = $scoreboard.guest.textColor;
    $: if (scoreGuest) scoreGuest.textContent = $scoreboard.guest.score;

    $: if (timer) timer.textContent = $scoreboard.time.min + ":" + $scoreboard.time.sec;
    $: if (timer) timer.style.color = $scoreboard.time.textColor;
    $: if (timer) timer.style.display = $scoreboard.time.enabled ? "block" : "none";

    $: if (period) period.textContent = $scoreboard.period.text;
    $: if (period) period.style.color = $scoreboard.period.textColor;
    $: if (period) period.style.display = $scoreboard.period.enabled ? "block" : "none";

    $: if (teamHome) teamHome.style.setProperty("--bg", `url(${logoHome})`);
    $: if (teamGuest) teamGuest.style.setProperty("--bg", `url(${logoGuest})`);

    $: if (score) score.style.backgroundColor = $scoreboard.special.textColor;
</script>
