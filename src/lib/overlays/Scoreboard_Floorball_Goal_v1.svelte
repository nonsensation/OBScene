<style lang="postcss">
    :root {
        --color_score: black;
        --color_time: white;

        --home_name: "Black Lions Landsberg";
        --away_name: "MFBC Leipzig";

        --home-background: linear-gradient(45deg, black 0% 15%, red 15% 25%, white 25% 100%);
        --away-background: linear-gradient(-45deg, red 0% 15%, black 15% 100%);

        --home-text-color: black;
        --away-text-color: white;

        --home-logo: url("http://homepagedesigner.telekom.de/imageprocessor/processor.cls/CMTOI/cm4all/com/widgets/PhotoToi/17/69/14/90/15d085f1bbb/scale_977_0%3Bdonotenlarge/15d085f1bbb");
        --away-logo: url("https://floorball-mfbc.de/wp-content/uploads/2020/07/Logo-MFBC.png");

        font-size: 1.75rem;
    }

    @import url("https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap");

    .container {
        font-family: "Quantico", sans-serif;
        font-weight: bold;
        background-color: transparent;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: center;
        position: relative;

        &.preview {
            background: gray
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
            background-size: 1rem 1rem;
        }
    }

    .scoreboard {
        display: flex;
        align-items: end;
        justify-content: center;
    }

    .home,
    .away,
    .period {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .home,
    .away {
        height: 100%;
        /* margin: 0 0.5rem; */
        margin-bottom: 0.25rem;
        border-radius: 1.5rem;
    }

    .home {
        border-top-right-radius: 0rem;
        border-bottom-right-radius: 0rem;
        background: var(--home-background);
        color: var(--home-text-color);
    }

    .away {
        border-top-left-radius: 0rem;
        border-bottom-left-radius: 0rem;
        background: var(--away-background);
        color: var(--away-text-color);
    }

    .goal {
        border-top: 0.225rem solid rgb(222, 0, 0);
        border-left: 0.225rem solid rgb(222, 0, 0);
        border-right: 0.225rem solid rgb(222, 0, 0);
        border-radius: 0.1rem;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        background-color: transparent;
        background-color: white;
        background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0.05rem, transparent 0.05rem),
            linear-gradient(to right, rgba(0, 0, 0, 0.15) 0.05rem, transparent 0.05rem);
        background-size: 0.25rem 0.25rem;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
    }

    .name {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 13rem;
        font-size: 1.15rem;
        padding: 0 1rem;
    }

    .name_home:before {
        /* content: var(--home_name); */
    }

    .name_away:before {
        /* content: var(--away_name); */
    }

    .score_home,
    .score_away {
        padding: 0.25rem 0.5rem;
        font-size: 1.75rem;
        color: var(--color_score);
    }

    img.logo {
        width: 2rem;
        height: 100%;
        height: 2rem;
        padding: 0.15rem 0;
        object-fit: contain;
    }

    .logo_home {
        margin-left: 0.5rem;
        /* content: var(--home-logo); */
    }

    .logo_away {
        margin-right: 0.5rem;
        /* content: var(--away-logo); */
    }

    .period {
        color: var(--color_time);
        font-size: 0.7rem;
    }

    .time {
        color: var(--color_time);
        display: grid;
        grid-template-columns: 2fr auto 2fr;
        font-size: 1rem;
        font-weight: normal;
    }

    .time_lhs,
    .time_rhs {
        width: 100%;
        display: flex;
    }

    .time_lhs {
        justify-content: flex-end;
    }

    .time_rhs {
        justify-content: flex-start;
    }

    img:not([src]) {
        visibility: hidden;
    }
</style>

<div class="container">
    <div class="scoreboard">
        <div class="home" id="home">
            <img class="logo logo_home" id="logo_home" />
            <div class="name name_home" id="name_home">Home-Team</div>
        </div>

        <div class="mid">
            <div class="period" id="period">1. Drittel</div>
            <div class="time" id="time">
                <div class="time_lhs">
                    <div class="min" id="time_min">00</div>
                </div>
                <div class="time_mid">
                    <div class="sep" id="time_sep">:</div>
                </div>
                <div class="time_rhs">
                    <div class="sec" id="time_sec">00</div>
                </div>
            </div>

            <div class="goal" id="goal">
                <div class="score">
                    <div class="score_home" id="score_home">{$scoreHome}</div>
                    <div class="score_away" id="score_away">{$scoreGuest}</div>
                </div>
            </div>
        </div>

        <div class="away" id="away">
            <div class="name name_home" id="name_away">Guest-Team</div>
            <img class="logo logo_away" id="logo_away" />
        </div>
    </div>
</div>

<script type="text/javascript">
    import { scoreHome, scoreGuest } from "$lib/stores/floorball-store";

    if (window.obs) {
        let minNode, secNode;

        window.addEventListener("load", () => {
            window.addEventListener("3li_obs_browser_home_background", ({ detail }) => {
                let node = document.getElementById("home");
                node.style.backgroundImage = detail.background;
            });

            window.addEventListener("3li_obs_browser_away_background", ({ detail }) => {
                let node = document.getElementById("away");
                node.style.backgroundImage = detail.background;
            });

            window.addEventListener("3li_obs_browser_home_logo", ({ detail }) => {
                let node = document.getElementById("logo_home");
                node.src = detail.image;
            });

            window.addEventListener("3li_obs_browser_away_logo", ({ detail }) => {
                let node = document.getElementById("logo_away");
                node.src = detail.image;
            });

            window.addEventListener("3li_obs_browser_score_home", ({ detail }) => {
                let node = document.getElementById("score_home");
                node.innerText = detail.score;
            });

            window.addEventListener("3li_obs_browser_score_away", ({ detail }) => {
                let node = document.getElementById("score_away");
                node.innerText = detail.score;
            });

            window.addEventListener("3li_obs_browser_period", ({ detail }) => {
                let node = document.getElementById("period");
                node.innerText = detail.period;
            });

            window.addEventListener("3li_obs_browser_home_name", ({ detail }) => {
                let node = document.getElementById("name_home");
                node.innerText = detail.name;
            });

            window.addEventListener("3li_obs_browser_away_name", ({ detail }) => {
                let node = document.getElementById("name_away");
                node.innerText = detail.name;
            });

            window.addEventListener("3li_obs_browser_home_textcolor", ({ detail }) => {
                let node = document.getElementById("name_home");
                node.style.color = detail.textcolor;
            });

            window.addEventListener("3li_obs_browser_away_textcolor", ({ detail }) => {
                let node = document.getElementById("name_away");
                node.style.color = detail.textcolor;
            });

            minNode = document.getElementById("time_min");
            secNode = document.getElementById("time_sec");

            window.addEventListener("3li_obs_browser_time", ({ detail }) => {
                let min = parseInt(detail.min) || 0;
                let sec = parseInt(detail.sec) || 0;

                let m = min < 10 ? "0" + min : min;
                let s = sec < 10 ? "0" + sec : sec;

                minNode.innerText = m;
                secNode.innerText = s;
            });

            window.addEventListener("3li_obs_browser_time_enabled", ({ detail }) => {
                let node = document.getElementById("time");
                node.style.display = detail.time_enabled ? "grid" : "none";
            });
        });
    }
</script>
