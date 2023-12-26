<style lang="postcss">
    .videdit {
        width: 100%;
        min-height: 10rem;
        height: auto;
        border-radius: var(--border-radius);
        position: relative;

        video {
            border-radius: var(--border-radius);
            width: 100%;
            height: auto;
            z-index: 1;
        }

        canvas {
            width: 100%;
            height: auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: var(--border-radius);
            z-index: 999;
        }
    }

    .center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    canvas.deskew {
        width: auto;
        height: auto;
        border-radius: var(--border-radius);
    }

    .regions {
        display: flex;
        flex-direction: column;
        width: 100%;
        border: var(--border);
        border-radius: var(--border-radius);
        margin: 2rem 0;

        .region {
            padding: 1em;
            display: grid;
            grid-template-columns: auto 1fr auto 1fr auto;
            place-content: center;
            place-items: center;
            gap: 1em;
            width: 100%;

            &.header {
                font-weight: bold;
                background-color: gainsboro;
                border-radius: var(--border-radius);
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
</style>

<svelte:window on:resize={handleSizeCorners} />
<div class="videdit">
    <video
        {width}
        {height}
        bind:this={videoElem}
        autoplay
        muted
        on:canplay={onVideoCanPlay}
        on:resize={handleSizeCorners}
    />
    <canvas
        {width}
        {height}
        bind:this={canvasCorners}
        on:mousedown={handleStartCorners}
        on:mouseup={handleEndCorners}
        on:mousemove={handleMoveCorners}
        on:resize={handleSizeCorners}
    />
</div>
<div class="center">
    <canvas
        class="deskew"
        {widthRegions}
        {heightRegions}
        bind:this={canvasRegions}
        on:mousedown={handleStartRegions}
        on:mouseup={handleEndRegions}
        on:mousemove={handleMoveRegions}
    />
</div>

<div class="center regions">
    {#if regions}
        <div class="region header">
            <div class="dim"># Position (Dimension)</div>
            <div class="img">Region</div>
            <div class="type">Type</div>
            <div class="ocr-value">OCR</div>
            <div class="edit">Edit</div>
        </div>
        {#each regions as region (region.id)}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="region"
                on:mouseenter={() => hoverRegion(region.id, true)}
                on:mouseleave={() => hoverRegion(region.id, false)}
            >
                <div class="dim">#{region.id} {region.x},{region.y} ({region.w}x{region.h})</div>
                <div class="img" />
                <div class="type">
                    <select>
                        <option value="">Score - Home</option>
                        <option value="">Score - Guest</option>
                        <option value="">Period</option>
                        <option value="">Time - Sec</option>
                        <option value="">Time - Sec</option>
                    </select>
                </div>
                <div class="ocr-value">???</div>
                <button class="edit" on:click={() => removeRegion(region.id)}
                    ><Icon name="delete" title="Remove" /></button
                >
            </div>
        {/each}
    {/if}
</div>

<script>
    // https://svelte.dev/repl/434e0b14546747688401e8808c060a23?version=3.47.0

    import { onMount, tick } from "svelte";
    import { corners } from "$lib/stores/ocr-store";
    import cv from "@techstark/opencv-js";
    import { Icon } from "$lib/components";

    let regions = [];
    let widthRegions, heightRegions;

    function addRegion(x = 0, y = 0) {
        currentRegionIndex = regions.length;
        regions = [
            ...regions,
            {
                id: currentRegionIndex,
                focused: false,
                type: "",
                x,
                y,
                w: 0,
                h: 0,
            },
        ];
    }

    function removeRegion(idx) {
        regions.splice(idx, 1);
        regions = regions;
    }

    function hoverRegion(regionId, isHovering) {
        regions[regionId].focused = isHovering;
    }

    function drawRegions() {
        for (let i = 0; i < regions.length; i++) {
            const r = regions[i];

            if( r.focused )
            {
                ctxRegions.lineWidth = 3;
                ctxRegions.strokeStyle = "gold";
            }
            else
            {
                ctxRegions.lineWidth = 2;
                ctxRegions.strokeStyle = "crimson";
            }

            ctxRegions.rect(r.x, r.y, r.w, r.h);
            ctxRegions.stroke();
        }
    }

    let currentRegionIndex = -1;
    let isDraggingRegions = false;

    function handleSizeRegions() {
        const oldWidth = widthRegions;
        const oldHeight = heightRegions;

        ({ width: widthRegions, height: heightRegions } = canvasRegions.getBoundingClientRect());

        if (oldHeight && oldWidth) {
            const scaleX = (widthRegions * 1.0) / oldWidth;
            const scaleY = (heightRegions * 1.0) / oldHeight;

            for (let i = 0; i < regions.length; i++) {
                regions[i].x *= scaleX;
                regions[i].y *= scaleY;
                regions[i].w *= scaleX;
                regions[i].h *= scaleY;
            }
        }

        drawRegions();
    }

    function handleStartRegions({ offsetX: x, offsetY: y }) {
        isDraggingRegions = true;
        addRegion(x, y);
    }

    function handleEndRegions() {
        currentRegionIndex = -1;
        isDraggingRegions = false;

        drawRegions();
    }

    function handleMoveRegions({ offsetX: x, offsetY: y }) {
        if (!isDraggingRegions) return;

        regions[currentRegionIndex].w = x - regions[currentRegionIndex].x;
        regions[currentRegionIndex].h = y - regions[currentRegionIndex].y;

        drawRegions();
    }

    let canvasCorners;
    let canvasRegions;

    let ctxCorners;
    let ctxRegions;

    let videoElem;

    const FPS = 30;

    let width, height;
    let isDragging = false;
    let circle;

    let src, dst, cap;

    let processVideoInterval = 0;

    onMount(async () => {
        ctxCorners = canvasCorners.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxCorners.imageSmoothingEnabled = false;

        ctxRegions = canvasRegions.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxRegions.imageSmoothingEnabled = false;

        try {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            videoElem.srcObject = stream;

            console.log(stream.getVideoTracks()[0].getSettings());
        } catch (error) {
            console.error(error);
        }

        setupCanvas();
    });

    const circleRadius = 20;
    const strokeWidth = 2;

    function setupCanvas() {
        const r = circleRadius + strokeWidth;

        if (!$corners || $corners.length <= 0) {
            console.log( "createCircle" )
            createCircle(0 + r, 0 + r, circleRadius);
            createCircle(0 + r, height - r, circleRadius);
            createCircle(width - r, height - r, circleRadius);
            createCircle(width - r, 0 + r, circleRadius);
        }
        else{
            console.log( "$corners.length: " + $corners.length )
        }

        handleSizeCorners();
        updatePerspectiveTransformMatrix();
        renderCorners();
    }

    function createCircle(x, y, radius, strokeWidth = 2, strokeColor = "teal", fillColor = "#00333333") {
        let c = {
            x,
            y,
            radius,
            radiusSq: radius * radius,
            strokeWidth: strokeWidth,
            strokeColor,
            fillColor,
            focused: false,
        };

        $corners = [...$corners, c];
    }

    function processVideo() {
        if (!cap) return;

        cap.read(src);

        cv.warpPerspective(src, dst, M, dSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

        cv.imshow(canvasRegions, dst);

        drawRegions();
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

    let M, dSize;

    function onVideoCanPlay() {
        handleSizeCorners();

        src = new cv.Mat(height, width, cv.CV_8UC4);
        dst = new cv.Mat(height, width, cv.CV_8UC4);
        cap = new cv.VideoCapture(videoElem);

        setupCanvas();

        if (processVideoInterval) {
            clearInterval(processVideoInterval);
            processVideoInterval = 0;
        }

        processVideoInterval = setInterval(processVideo, 1000 / FPS);
    }

    function handleSizeCorners() {
        handleSizeRegions();

        const oldWidth = width;
        const oldHeight = height;

        ({ width, height } = videoElem.getBoundingClientRect());

        if (oldHeight && oldWidth) {
            const scaleX = (width * 1.0) / oldWidth;
            const scaleY = (height * 1.0) / oldHeight;

            for (let i = 0; i < $corners.length; i++) {
                $corners[i].x *= scaleX;
                $corners[i].y *= scaleY;
            }
        }

        if (src) src.delete();
        if (dst) dst.delete();

        src = new cv.Mat(height, width, cv.CV_8UC4);
        dst = new cv.Mat(height, width, cv.CV_8UC4);

        updatePerspectiveTransformMatrix();
        renderCorners();
    }

    function handleStartCorners() {
        isDragging = true;
    }

    function handleEndCorners() {
        circle = undefined;
        isDragging = false;

        for (let i = 0; i < $corners.length; i++) {
            let c = $corners[i];
            c.focused = false;
        }

        renderCorners();
    }

    function handleMoveCorners({ offsetX: x, offsetY: y }) {
        if (!isDragging) return;

        let idx = -1;

        if (!circle) {
            for (let i = 0; i < $corners.length; i++) {
                let c = $corners[i];
                const diffX = x - c.x;
                const diffY = y - c.y;
                const dstSq = diffX * diffX + diffY * diffY;

                if (dstSq < c.radiusSq) {
                    idx = i;
                    circle = c;
                    break;
                }
            }
        }

        if (circle) {
            circle.x = x;
            circle.y = y;
            circle.focused = true;

            if (idx !== -1) {
                $corners[idx].x = x;
                $corners[idx].y = y;
            }

            updatePerspectiveTransformMatrix();

            renderCorners();
        }
    }

    function updatePerspectiveTransformMatrix() {
        let { width: W, height: H } = getDimensions($corners);

        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
            $corners[0].x,
            $corners[0].y,
            $corners[1].x,
            $corners[1].y,
            $corners[2].x,
            $corners[2].y,
            $corners[3].x,
            $corners[3].y,
        ]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 0, H - 1, W - 1, H - 1, W - 1, 0]);

        M = cv.getPerspectiveTransform(srcTri, dstTri);
        dSize = new cv.Size(W, H);
    }

    function renderCorners() {
        if (!$corners || !$corners.length) return;

        ctxCorners.clearRect(0, 0, width, height);

        for (let i = 0; i < $corners.length; i++) {
            const c = $corners[i];
            ctxCorners.beginPath();
            ctxCorners.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
            ctxCorners.closePath();
            if (c.focused) {
                ctxCorners.fillStyle = "#00888805";
                ctxCorners.lineWidth = c.strokeWidth * 2;
                ctxCorners.strokeStyle = "slateblue";
            } else {
                ctxCorners.fillStyle = "#00888810";
                ctxCorners.lineWidth = c.strokeWidth;
                ctxCorners.strokeStyle = "teal";
            }

            ctxCorners.fill();
            ctxCorners.stroke();
        }

        // draw rectangle
        ctxCorners.fillStyle = "#00888810";
        ctxCorners.lineWidth = strokeWidth;
        ctxCorners.strokeStyle = "teal";
        ctxCorners.beginPath();
        ctxCorners.moveTo($corners[0].x, $corners[0].y);
        for (let i = 1; i < $corners.length; i++) {
            const c = $corners[i];
            ctxCorners.lineTo(c.x, c.y);
        }
        ctxCorners.closePath();
        ctxCorners.fill();
        ctxCorners.stroke();
    }
</script>
