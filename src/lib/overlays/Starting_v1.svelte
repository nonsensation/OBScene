<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Quicksand:500,600,700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Asap+Condensed:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100;200;300;400;500;600;700;800;900&display=swap");

    .container {
        font-family: "Quantico", sans-serif;
        font-family: "Impact", sans-serif;
        font-family: "Asap Condensed", sans-serif;
        font-family: "Geologica", sans-serif;

        display: grid;
        justify-content: stretch;
        align-items: stretch;

        width: 100%;
        height: 100%;

        background-color: #e10615;

        padding: 5vmin;
        /* margin: 5vmin; */
    }

    .logos {
        display: flex;
        justify-content: center;
        align-items: center;

        .vs {
            font-size: 3vmin;
            font-weight: bold;
            width: 20%;
        }
        img {
            filter: drop-shadow(0 0 50px black);
            object-fit: contain;
            /* width: 100%; */
            /* height: auto; */
        }
    }

    .txt {
        display: grid;
        grid-template-rows: auto;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-transform: uppercase;
        color: white;
        filter: drop-shadow(0 0 10px black);
        word-break: keep-all;
        white-space: nowrap;

        .top {
            font-size: 5vmin;
            justify-self: start;
            align-self: start;
        }
        .mid {
            line-height: 80%;
            font-size: 20vmin;
            font-weight: 900;
            justify-self: center;
            align-self: center;
        }
        .bot {
            font-size: 5vmin;
            justify-self: end;
            align-self: end;
        }
    }
</style>

<div class="container" style="font-size: {scale}%">
    <div class="logos">
        <div class=""><img src={Logo_Home} alt="" /></div>
        <div class="vs txt">vs</div>
        <div class=""><img src={Logo_Guest} alt="" /></div>
    </div>

    <div class="txt">
        <div class="top">Herzlich willkommen zum</div>
        <div class="mid">Live-Stream</div>
        <div class="bot">Gleich geht es los</div>
    </div>
</div>

<script type="text/javascript">
    import { onMount } from "svelte";
    import { scoreboard } from "$lib/stores/scoreboard-store";

    import Logo_Home from "$lib/assets/logos/Logo Black Lions Landsberg 0.png";
    import Logo_Guest from "$lib/assets/logos/Logo Black Lions Landsberg 0.png";

    export let scale = 100;
</script>
