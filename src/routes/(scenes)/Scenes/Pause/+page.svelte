<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

    .aspect-16by9 {
        aspect-ratio: 16 / 9;
        width: 100%;
        height: auto;
        border: 3px dashed red;

        display: flex;
        justify-content: center;
    }

    .bg {
        background: linear-gradient(white 0% 50%, black 50%);
    }

    .title {
        font-family: "Noto Sans", sans-serif;
        /* font-family: "Quantico", sans-serif; */
        font-weight: bold;
        font-size: 5rem;
    }

    .mask-ripped {
        --mask-size: 3em;
        mask: url("https://i.ibb.co/7RW8C9t/top.png") top / auto var(--mask-size) repeat-x,
            linear-gradient(white, white) no-repeat center/100% calc(100% - 2 * var(--mask-size)),
            url("https://i.ibb.co/5WvbqgG/zmylJ.png") bottom/auto var(--mask-size) repeat-x;
    }

    .team {
        width: 100%;
        img {
            width: 40%;
        }
    }
</style>

<div class="aspect-16by9 bg mask-ripped">
    <div class="title">Pause</div>
    <div class="team home">
        {#if $teamHome}
            <img src={URL.createObjectURL($teamHome.logo)} alt="" />
        {/if}
    </div>
    <div class="team guest">
        {#if $teamGuest}
            <img src={URL.createObjectURL($teamGuest.logo)} alt="" />
        {/if}
    </div>
</div>

<script>
    import { liveQuery } from "dexie";
    import { db } from "$lib/database/dexie-db";
    import { scoreboard } from "$lib/stores/scoreboard-store";

    let teamHome = liveQuery(() => db.teams.get({ id: $scoreboard.home.teamId }));
    let teamGuest = liveQuery(() => db.teams.get({ id: $scoreboard.guest.teamId }));
</script>
