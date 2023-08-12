<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .container {
        font-family: "Red Hat Text", sans-serif;
        font-family: "Ubuntu", sans-serif;
        font-weight: bold;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .goal {
        /* outline: 2px solid red; */
        align-self: end;
        margin: 5em;
        border-radius: 0.2em;
        display: flex;
        place-items: center;
        background-color: white;
        height: auto;
        overflow: hidden;
        opacity: 0;

        img {
            padding: 0.5em;
            height: 100%;
            width: 100%;
            max-width: 7em;
            z-index: 2;
            object-fit: contain;
        }

        .info {
            padding-right: 1em;
            color: black;
            display: flex;
            flex-direction: column;
            align-items: start;
            white-space: nowrap;
            text-transform: uppercase;
            font-size: 120%;

            * {
                padding: 0.3em;
                padding-left: 0;
            }
            .title {
                color: crimson;
            }
            .team {
                position: relative;
                z-index: 1;

                &:before {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    background-color: #dddddd80;
                    width: 300%;
                    height: 100%;
                    z-index: -1;
                    content: "";
                }
            }
            .player {
            }
        }

        animation: fade 5s;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>

<div class="container" style="font-size: {scale}%">
    <div class="goal">
        <img src={Logo_Home} alt="" />
        <div class="info">
            <div class="title">Tor</div>
            <div class="team">Black Lions Landsberg</div>
            <div class="player">#4 Christoph Lohrmann</div>
        </div>
    </div>
</div>

<script type="text/javascript">
    import { scoreHome, scoreGuest } from "$lib/stores/floorball-store";

    import Logo_Home from "$lib/assets/logos/Logo Black Lions Landsberg 0.png";
    import Logo_Guest from "$lib/assets/logos/Floorball/Logo Dümptener Füchse 1.png";

    export let scale = 100;
</script>
