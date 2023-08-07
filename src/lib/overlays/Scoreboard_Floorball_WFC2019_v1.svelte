<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style>
    @import url("https://fonts.googleapis.com/css2?family=family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .scoreboard {
        font-family: "Quantico", sans-serif;
        font-weight: 900;
        width: 30em;
    }

    .name_home,
    #score_home {
        color: black;
    }
    .name_away,
    #score_away {
        color: black;
    }
    .name_home::after {
        content: "Black Lions";
    }
    .home {
        background: linear-gradient(0deg, black 10%, white 5%);
    }
    .logo_home {
        content: url("../../Shared/Logos/Black\ Lions\ Landsberg/Logo Black Lions Landsberg 0.png");
    }

    .name_away::after {
        content: "Magdeburg";
    }
    .away {
        background: linear-gradient(0deg, green 10%, red 5%);
    }
    .logo_away {
        content: url("../../Shared/Logos/Floorball Tigers Magdeburg/Logo-Floorball-Tigers-Magdeburg-1.png");
    }

    .scoreboard {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 3em;
    }

    .header {
        display: flex;
        width: 100%;
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
        flex-direction: row;
        justify-content: center;
        font-weight: 500;
        display: none;
    }
    .header > .period {
        padding: 0.15em 0.5em;
        padding-top: 0;
        left: 0;
        position: absolute;
    }
    .header > .time {
        align-self: center;
        color: transparent;
    }

    .body {
    }
    .teams {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 175%;
    }
    .home {
        width: 50%;
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .away {
        width: 50%;
        display: flex;
        align-items: center;
        background-color: rgba(230, 190, 0, 0.99);
        flex-direction: row;
        justify-content: space-between;
    }
    .teamscore {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .logo {
        display: flex;
        padding: auto;
        margin: auto;
    }
    .logo > img {
        height: 1.25em;
    }
    .home > .logo {
        padding-right: 0.2em;
    }
    .away > .logo {
        padding-left: 0.2em;
    }
    .score,
    .away,
    .home {
        padding: 0 0.2em;
    }
    .name {
        overflow: hidden;
        white-space: nowrap;
    }
</style>

<div class="scoreboard">
    <div class="header">
        <div class="period" id="period">1. Drittel</div>
        <div class="time">00:00</div>
    </div>
    <div class="body">
        <div class="teams">
            <div class="home">
                <div class="logo">
                    <img class="logo_home" src="" alt="" />
                </div>
                <div class="teamscore">
                    <div class="dummy-to-center" />
                    <div class="name name_home" />
                    <div class="score" id="score_home">0</div>
                </div>
            </div>
            <div class="away">
                <div class="teamscore" style="color: rgb(0, 0, 0)">
                    <div class="score" id="score_away">0</div>
                    <div class="name name_away" />
                    <div class="dummy-to-center" />
                </div>
                <div class="logo">
                    <img class="logo_away" src="" alt="" />
                </div>
            </div>
        </div>
    </div>
</div>

<script>
export let scale = "50%";
</script>
