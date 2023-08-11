<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

    .container {
        font-family: "Noto Sans", sans-serif;
        font-family: "Quantico", sans-serif;
        font-size: 120%;

        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        background: radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%),
            linear-gradient(transparent 0 25%, black 80% 100%),
            url("$lib/assets/logos/Teamfoto 1.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-color: black;
        background-size: cover;

        &:before,
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        &:before {
            backdrop-filter: blur(3px);
            mask: radial-gradient(circle, rgba(255, 255, 255, 00) 30%, rgba(255, 255, 255, 1) 60%);
        }

        &:after {
            backdrop-filter: grayscale();
            mask: radial-gradient(circle, rgba(255, 255, 255, 0.5) 30%, rgba(255, 255, 255, 1) 70%);
        }
    }

    .gradient {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 2;
        /* backdrop-filter: grayscale() blur(1px); */
    }
    .countdown {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 5em;
        background-blend-mode: normal;
    }
</style>

<div class="container" style="font-size: {scale}%">
    <div class="gradient">
        <div class="countdown">
            <FlipCardTimer {targetDate} />
        </div>
    </div>
</div>

<script type="text/javascript">
    import { scoreboard } from "$lib/stores/scoreboard-store";

    import Teamfoto from "$lib/assets/Teamfoto 1.png";
    import Logo_Home from "$lib/assets/logos/Logo Black Lions Landsberg 0.png";
    import Logo_Guest from "$lib/assets/logos/Floorball/Logo Dümptener Füchse 1.png";
    import Logo_FDP from "$lib/assets/logos/Floorball/Floorball Deutschland Pokal 4.svg";

    export let scale = 100;

    import FlipCardTimer from "$lib/components/FlipCardTimer/FlipCardTimer.svelte";

    const targetDate = new Date("2023-09-10 16:00:00");
</script>
