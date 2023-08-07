<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .container {
        font-family: "Quantico", sans-serif;
        font-weight: bold;

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        border: 3px dotted red;
    }

    .scoreboard {
        font-size: 2rem;

        border: 2px dotted green;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .board {
        display: grid;
        grid-template-columns: auto auto auto;
    }
    .team.home {
        align-self: self-end;
    }
    .goal {
        align-self: center;

        border: 0.25rem solid red;
        border-radius: 1rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none;

        background-color: rgb(255, 255, 255);
        background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0.1rem, transparent 0.1rem),
            linear-gradient(to right, rgba(0, 0, 0, 0.15) 0.1rem, transparent 0.1rem);
        background-size: 0.5rem 0.5rem;

        display: grid;
        grid-template-columns: 1fr 1fr;

        .score {
            margin: 1rem;
            font-size: 3rem;
        }
    }
    .team.guest {
        align-self: self-start;
    }

    .name {
    }
</style>

<div class="container">
    <div class="scoreboard">
        <div class="timer">13:37</div>
        <div class="period">1. Drittel</div>
        <div class="board">
            <div class="team home">
                <img src="" alt="" class="logo" />
                <div class="name">HOME</div>
            </div>
            <div class="goal">
                <div class="score home">13</div>
                <div class="score guest">13</div>
            </div>
            <div class="team guest">
                <div class="name">GUEST</div>
                <img src="" alt="" class="logo" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    import { scoreHome, scoreGuest } from "$lib/stores/floorball-store";
</script>
