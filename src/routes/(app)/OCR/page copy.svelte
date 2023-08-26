<style lang="postcss">
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 2rem;

        .halfwidth {
            --min-width: 20rem;
            flex: 1 1 var(--min-width);
            min-width: var(--min-width);
        }
        .fullwidth {
            flex-basis: 100%; /* new full width row */
            width: 100%;
        }
    }

    .preview {
        background: gray
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25" ><rect x="50" width="50" height="50" /><rect y="50" width="50" height="50" /></svg>');
        background-size: 1rem 1rem;

        width: 100%;
        min-height: 10rem;
        height: auto;
        border-radius: 0.25rem;
        position: relative;

        display: flex;
        place-content: center;
        place-items: center;
    }

    .sbImg {
        --threshold: 10%;
        width: 100%;
        filter: invert() grayscale() brightness() contrast(1000%);

        mix-blend-mode: multiply;
        isolation: isolate;
    }

    .filters {
        display: flex;
        flex-direction: column;
        width: 100%;

        .filter {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 2rem;

            .filter-item {
                flex: 1 1 10rem;
                min-width: 10rem;

                label {
                    font-size: 80%;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }

    .videdit {
        width: 100%;
        min-height: 10rem;
        height: auto;
        border-radius: var(--border-radius);
        position: relative;

        video {
            border-radius: var(--border-radius);
            width: 100%;
        }

        canvas {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: var(--border-radius);
        }
    }

    .btn-reset {
        width: auto;
    }

    video {
        background-color: #00550033;
        /* display: none; */
        /* opacity: 0; */
    }

    .deskew {
        justify-self: center;
        height: 20rem;
        width: 50%;
        height: auto;
        background-color: aliceblue;
        border-radius: var(--border-radius);
    }
</style>

<svelte:window on:resize={handleSize} />

<h1>Tesseract-OCR</h1>

<div class="container">
    {#if videoDevices}
        <select
            name=""
            id=""
            bind:value={$selectedVideoDeviceId}
            on:click={updateVideoDevices}
            on:change={() => onChange($selectedVideoDeviceId)}
        >
            <option value="" selected disabled hidden>Select a Camera</option>
            <optgroup label="Connected Cameras">
                {#each videoDevices as videoDevice}
                    <option value={videoDevice.deviceId}>{videoDevice.label}</option>
                {/each}
            </optgroup>
        </select>
    {/if}

    <div class="fullwidth preview videdit">
        <video bind:this={videoElem} on:resize={handleSize} on:canplay={setupCanvas} autoplay muted />
        <canvas {width} {height} bind:this={canvasVideo} on:resize={handleSize} />
        <canvas
            {width}
            {height}
            bind:this={canvasElem}
            on:mousedown={handleStart}
            on:touchstart={handleStart}
            on:mouseup={handleEnd}
            on:touchend={handleEnd}
            on:mouseleave={handleEnd}
            on:mousemove={handleMove}
            on:touchmove={handleTouchMove}
            on:resize={handleSize}
        />
    </div>

    <canvas class="deskew fullwidth" bind:this={canvasDeskew} />

    <Accordeon open>
        <div slot="head">
            <span>Regions</span>
        </div>
        <div slot="content" class="filter">
            {#if false}{/if}
        </div>
    </Accordeon>

    <div class="filters">
        <Accordeon>
            <div slot="head">
                <span>Luma Key</span>
                <Switch bind:checked={$filter.luma.enabled} />
            </div>
            <div slot="content" class="filter">
                <div class="filter-item">
                    <label for="lumaMin">
                        <span class="title">Min Luma</span>
                        <span class="value">{$filter.luma.min}</span>
                    </label>
                    <input type="range" bind:value={$filter.luma.min} min="0" max="1" step="0.001" />
                </div>
                <div class="filter-item">
                    <label for="lumaMinSmooth">
                        <span class="title">Min Luma Smooth</span>
                        <span class="value">{$filter.luma.minSmooth}</span>
                    </label>
                    <input type="range" bind:value={$filter.luma.minSmooth} min="0" max="1" step="0.001" />
                </div>
                <div class="filter-item">
                    <label for="lumaMax">
                        <span class="title">Max Luma</span>
                        <span class="value">{$filter.luma.max}</span>
                    </label>
                    <input type="range" bind:value={$filter.luma.max} min="0" max="1" step="0.001" />
                </div>
                <div class="filter-item">
                    <label for="lumaMaxSmooth">
                        <span class="title">Max Luma Smooth</span>
                        <span class="value">{$filter.luma.maxSmooth}</span>
                    </label>
                    <input type="range" bind:value={$filter.luma.maxSmooth} min="0" max="1" step="0.001" />
                </div>
                <button class="btn-reset" on:click={resetFilterLuma}><Icon name="undo" title="Reset" /></button>
            </div>
        </Accordeon>
    </div>
</div>

<script>
    import { onMount } from "svelte";
    import { selectedVideoDeviceId, filter } from "$lib/stores/ocr-store";
    import screenshot from "$lib/assets/logos/Screensho-Scoreboard.png";
    import { Switch, Accordeon, Icon } from "$lib/components";
    import { filterLuma, filterThreshold } from "./filter";
    import cv from "@techstark/opencv-js";

    let canvasDeskew;
    let canvasElem;
    let canvasVideo;

    let videoElem;
    let ctxCorners;
    let ctxVideo;
    let ctxDeskew;
    let videoDevices = [];

    const fps = 10;

    let width, height, top, left;
    let isDrawing;
    let circle;

    const handleStart = () => {
        isDrawing = true;
    };
    const handleEnd = () => {
        circle = undefined;
        isDrawing = false;

        for (let i = 0; i < circles.length; i++) {
            let c = circles[i];
            c.focused = false;
        }

        render();
    };
    const handleMove = ({ offsetX: x, offsetY: y }) => {
        if (!isDrawing) return;

        if (!circle) {
            for (let i = 0; i < circles.length; i++) {
                let c = circles[i];
                const diffX = x - c.x;
                const diffY = y - c.y;
                const dstSq = diffX * diffX + diffY * diffY;

                if (dstSq < c.radiusSq) {
                    circle = c;
                    break;
                }
            }
        }

        if (circle) {
            circle.x = x;
            circle.y = y;
            circle.focused = true;
        }

        render();
    };
    const handleTouchMove = (e) => {
        const { clientX, clientY } = e.touches[0];
        handleMove({
            x: clientX - left,
            y: clientY - top,
        });
    };
    const handleSize = () => {
        ({ top, left, width, height } = canvasElem.getBoundingClientRect());

        render();
    };

    function setupCanvas() {
        handleSize();

        const r = 30;
        circles = [];

        createCircle(0 + r, 0 + r, r);
        createCircle(0 + r, height - r, r);
        createCircle(width - r, height - r, r);
        createCircle(width - r, 0 + r, r);

        render();
    }

    let circles = [];

    function createCircle(x, y, radius, strokeWidth = 2, strokeColor = "teal", fillColor = "#00333333") {
        let c = {
            x,
            y,
            radius,
            radiusSq: radius * radius,
            strokeWidth,
            strokeColor,
            fillColor,
            focused: false,
        };

        circles.push(c);

        return circle;
    }

    function render() {
        if (!circles.length) return;

        ctxCorners.clearRect(0, 0, canvasElem.width, canvasElem.height);
        ctxVideo.clearRect(0, 0, canvasVideo.width, canvasVideo.height);

        for (let i = 0; i < circles.length; i++) {
            const c = circles[i];
            ctxCorners.beginPath();
            ctxCorners.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
            ctxCorners.closePath();
            if (c.focused) {
                ctxCorners.fillStyle = "#00888822";
                ctxCorners.lineWidth = c.strokeWidth * 2;
                ctxCorners.strokeStyle = "slateblue";
            } else {
                ctxCorners.fillStyle = "#00888833";
                ctxCorners.lineWidth = c.strokeWidth;
                ctxCorners.strokeStyle = "teal";
            }

            ctxCorners.fill();
            ctxCorners.stroke();
        }

        // draw rectangle
        ctxCorners.beginPath();
        ctxCorners.moveTo(circles[0].x, circles[0].y);
        for (let i = 1; i < circles.length; i++) {
            const c = circles[i];
            ctxCorners.lineTo(c.x, c.y);
        }
        ctxCorners.closePath();
        ctxCorners.fill();
    }

    onMount(async () => {
        try {
            // Hack (labels are empty)
            // See: https://stackoverflow.com/questions/60297972
            if( location.hostname === "localhost" || location.hostname === "127.0.0.1" ){
                let _ = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            }
        } catch (error) {
            console.error(error);
        }

        ctxCorners = canvasElem.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxCorners.imageSmoothingEnabled = false;

        ctxVideo = canvasVideo.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxVideo.imageSmoothingEnabled = false;

        ctxDeskew = canvasDeskew.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxDeskew.imageSmoothingEnabled = false;

        onChange($selectedVideoDeviceId);
        setupCanvas();

        let canvasInterval = window.setInterval(drawImage, 1000 / fps);
    });

    async function updateVideoDevices() {
        try {
            let devices = await navigator.mediaDevices.enumerateDevices();

            videoDevices = devices.filter(({ kind }) => kind === "videoinput");
        } catch (error) {
            console.error(error);
        }
    }

    function resetFilterLuma() {
        $filter.luma.min = 0.0;
        $filter.luma.minSmooth = 0.0;
        $filter.luma.max = 1.0;
        $filter.luma.maxSmooth = 0.0;
    }

    async function onChange(videoDeviceId) {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: { exact: videoDeviceId },
                },
            });

            videoElem.srcObject = stream;

            console.log(stream.getVideoTracks()[0].getSettings());
        } catch (error) {
            console.error(error);
        }
    }

    function drawImage() {
        ctxVideo.drawImage(videoElem, 0, 0, width, height);
        getDeskewedSubImage();
    }

    function getDimensions(corners) {
        const [topLeft, botLeft, botRight, topRight] = corners;

        const widthB = Math.hypot(botRight.x - botLeft.x, botRight.y - botLeft.y);
        const widthT = Math.hypot(topRight.x - topLeft.x, topRight.y - topLeft.y);
        const heightR = Math.hypot(topRight.x - botRight.x, topRight.y - botRight.y);
        const heightL = Math.hypot(topLeft.x - botLeft.x, topLeft.y - botLeft.y);

        return {
            width: Math.max(widthT, widthB),
            height: Math.max(heightR, heightL),
        };
    }

    function getDeskewedSubImage() {
        let { W, H } = getDimensions(circles);
        let src = cv.imread(canvasVideo);
        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
            circles[0].x,
            circles[0].y,
            circles[1].x,
            circles[1].y,
            circles[2].x,
            circles[2].y,
            circles[3].x,
            circles[3].y,
        ]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 0, H - 1, W - 1, H - 1, W - 1, 0]);

        let M = cv.getPerspectiveTransform(srcTri, dstTri);
        cv.warpPerspective(src, src, M, new cv.Size(W, H), cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        ctxDeskew.clearRect(0, 0, canvasDeskew.width, canvasDeskew.height);
        cv.imshow(canvasDeskew, src);
        src.delete();
        M.delete();
    }
</script>
