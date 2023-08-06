<style lang="postcss">
    .dseg {
        font-family: DSEG7-Classic;
        font-size: 100cqmin;
        resize: both;
    }

    .scoreboard {
        height: 25%;
        display: grid;
        grid-template-columns: 1fr auto auto auto 1fr;
        gap: 0.5rem;
        container-type: size;
    }

    .score-btns {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 0.25rem;

        &.home {
            justify-self: end;
        }
        &.guest {
            justify-self: start;
        }

        button {
            margin: 0;
            /* font-size: 2rem; */
            resize: both;
            /* font-size: 4cqmin; */
            height: 100%;
        }

        outline: 2px dashed green;
    }

    .score {
        display: flex;
    }

    .score-display {
        position: relative;
        color: red;
        min-width:1.75em; /* 3em when 99+ score */

        outline: 2px dashed blue;

        &.home {
            justify-self: end;
            text-align: end;
            &:before {
                right: 0;
            }
        }
        &.guest {
            justify-self: start;
            text-align: start;

            &:before {
                left: 0;
            }
        }

        &:before {
            position: absolute;
            opacity: 0.075;
            color: black;
            content: "88";
        }
    }

    .colon {
        color: red;
    }

    .image-upload {
        height: 100%;

        outline: 2px dotted rebeccapurple;

        input {
            display: none;
        }

        label {
            display: grid;
            justify-items: center;
            align-items: center;
            justify-content: center;
            align-content: center;
            height: 100%;
        }
        img {
            outline: 2px solid green;

            min-width: 5rem;
            max-width: 80%;
            width: 100%;
            /* height: 4000%; */

            object-fit: contain;
            cursor: pointer;
            border-radius: 0.25rem;
            border: 1px solid gray;

            background: gray
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
            background-size: 1.25rem 1.25rem;
            /* box-shadow: rgsb(38, 57, 77) 0px 20px 30px -10px; */
        }
    }
</style>

<div class="scoreboard">

    <div class="image-upload">
        <label for="inputLogoHome">
            <img bind:this={imgLogoHome} src="" />
        </label>
        <input id="inputLogoHome" bind:this={inputLogoHome} on:change={() => onImageChange()} type="file" />
    </div>

    <div class="score-btns home">
        <button on:click={() => changeScore(HOME, +1)} bind:this={node_btnScoreHomeAdd} class="material-symbols-rounded"
            >add</button
        >
        <button on:click={() => changeScore(HOME, -1)} bind:this={node_btnScoreHomeSub} class="material-symbols-rounded"
            >remove</button
        >
    </div>
    <div class="score">
        <div class="score-display home dseg">{$scoreHome}</div>
        <div class="dseg colon">:</div>
        <div class="score-display guest dseg">{$scoreGuest}</div>
    </div>


    <div class="score-btns guest">
        <button
            on:click={() => changeScore(GUEST, +1)}
            bind:this={node_btnScoreGuestAdd}
            class="material-symbols-rounded">add</button
        >
        <button
            on:click={() => changeScore(GUEST, -1)}
            bind:this={node_btnScoreGuestSub}
            class="material-symbols-rounded">remove</button
        >
    </div>

    <div class="image-upload">
        <label for="inputLogoGuest">
            <img bind:this={imgLogoGuest} src="" />
        </label>
        <input id="inputLogoGuest" bind:this={inputLogoGuest} on:change={() => onImageChange()} type="file" />
    </div>
</div>


<script>
    import "dseg/css/dseg.css";

    import { scoreHome, scoreGuest } from "$lib/stores/floorball-store";
    import { obsSendData } from "$lib/stores/obs-store";

    let inputLogoHome;
    let inputLogoGuest;
    let imgLogoHome;
    let imgLogoGuest;

    function onImageChange() {
        let file = inputLogoHome.files[0];
        let reader = new FileReader();

        reader.onloadend = async function () {
            await obsSendData("3li_obs_browser_home_logo", {
                image: reader.result,
            });
        };
        reader.readAsDataURL(file);

        imgLogoHome.src = URL.createObjectURL(file);
    }

    let node_btnScoreHomeAdd;
    let node_btnScoreHomeSub;
    let node_btnScoreGuestAdd;
    let node_btnScoreGuestSub;

    let scoreStr;

    $: {
        let homeStr = $scoreHome;
        let guestStr = $scoreGuest;

        if ($scoreHome < 10) homeStr = " " + homeStr;
        if ($scoreGuest < 10) guestStr = " " + guestStr;

        scoreStr = homeStr + " : " + guestStr;
    }

    const HOME = "home";
    const GUEST = "guest";

    async function changeScore(team, score) {
        let newScore = -1;

        if (team === HOME) {
            $scoreHome += score;
            if ($scoreHome < 0) $scoreHome = 0;
            if ($scoreHome > 99) $scoreHome = 99;
            obsSendData("3li_obs_browser_score_home", { score: $scoreHome });
        } else if (team === GUEST) {
            $scoreGuest += score;
            if ($scoreGuest < 0) $scoreGuest = 0;
            if ($scoreGuest > 99) $scoreGuest = 99;
            obsSendData("3li_obs_browser_score_away", { score: $scoreGuest });
        } else {
            console.assert(false, "Invalid team: " + team);
        }
    }
</script>
