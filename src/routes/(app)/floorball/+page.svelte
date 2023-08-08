<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap');

    .dseg {
        font-family: DSEG7-Classic;
        font-size: 5rem;
    }

    .quantico {
        font-family: 'Quantico', sans-serif;
        font-size: 5rem;
    }

    .scoreboard {
        display: flex;
        flex-direction: column;
        place-items: stretch;
        place-content: stretch;

        & * {
            outline: 1px solid red;
        }
    }

</style>

<div class="scoreboard">

    <div class="team">
        <div class="teamname">HOME</div>
    </div>



    <div class="quantico dseg">13</div>

    <Scoreboard/>
</div>


<script>
    import "dseg/css/dseg.css"

    import { scoreHome, scoreGuest } from "$lib/stores/floorball-store";
    import { obsSendData } from "$lib/stores/obs-store";
    import Scoreboard from './Scoreboard.svelte'

</script>
