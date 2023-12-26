<!--


	https://i.pinimg.com/originals/26/54/10/265410f67ad4690b6727465b1276ce52.jpg
	https://codepen.io/selimdoyranli/pen/gOOLeyQ

-->

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    div {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
</style>

<div>
    <!-- <FlipCard callback={handleTick} name="Tage" number={time.days} /> -->
    <FlipCard callback={handleTick} name="Stunden" number={time.hours} />
    <FlipCard callback={handleTick} name="Minuten" number={time.minutes} />
    <FlipCard callback={handleTick} name="Sekunden" number={time.seconds} />
</div>

<script lang="ts">
    //Credits: https://zoel-countdowntimer.vercel.app/

    import { onMount } from "svelte";
    import FlipCard from "./FlipCard.svelte";

    export let targetDate: Date = new Date(new Date().setDate(new Date().getDate() + 2));

    let time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    const handleTick = () => {
        const currentDate = new Date();
        const gap = targetDate.getTime() - currentDate.getTime();

        const getDays = Math.floor(gap / (1000 * 60 * 60 * 24));
        const getHours = Math.floor((gap / (1000 * 60 * 60)) % 24);
        const getMinutes = Math.floor((gap / 1000 / 60) % 60);
        const getSeconds = Math.floor((gap / 1000) % 60);

        time.days = getDays;
        time.hours = getHours;
        time.minutes = getMinutes;
        time.seconds = getSeconds;
    };

    onMount(() => {
        handleTick();
    });
</script>
