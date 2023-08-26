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

    canvas.deskew {
        width: 50%;
        height: auto;
    }
</style>

<svelte:window on:resize={handleSize} />
<div class="videdit">
    <video {width} {height} bind:this={videoElem} autoplay muted on:canplay={onVideoCanPlay} on:resize={handleSize} />
    <canvas
        {width}
        {height}
        bind:this={canvasCorners}
        on:mousedown={handleStart}
        on:touchstart={handleStart}
        on:mouseup={handleEnd}
        on:touchend={handleEnd}
        on:mousemove={handleMove}
        on:touchmove={handleTouchMove}
        on:resize={handleSize}
    />
</div>
<canvas class="deskew" {width} {height} bind:this={canvasOut} />

<script>
    import { onMount, tick } from "svelte";
    import cv from "@techstark/opencv-js";

    let canvasCorners;
    let canvasOut;
    let ctxCorners;
    let ctxDeskew;
    let videoElem;

    const FPS = 3;

    let width, height, top, left;
    let isDragging = false;
    let circle;
    let corners = [];

    let src, dst, cap;

    let processVideoInterval = 0;

    onMount(async () => {
        ctxCorners = canvasCorners.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxCorners.imageSmoothingEnabled = false;

        ctxDeskew = canvasOut.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxDeskew.imageSmoothingEnabled = false;

        try {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            videoElem.srcObject = stream;

            console.log(stream.getVideoTracks()[0].getSettings());
        } catch (error) {
            console.error(error);
        }
    });

    const circleRadius = 20;
    const strokeWidth = 2;

    function setupCanvas() {
        handleSize();

        corners = [];

        const r = circleRadius + strokeWidth;

        createCircle(0 + r, 0 + r, circleRadius);
        createCircle(0 + r, height - r, circleRadius);
        createCircle(width - r, height - r, circleRadius);
        createCircle(width - r, 0 + r, circleRadius);

        updatePerspectiveTransformMatrix();
        render("setupCanvas render");
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

        corners.push(c);

        return c;
    }

    function processVideo() {
        if (!cap) {
            console.log("processVideo !cap");
            return;
        }
        cap.read(src);

        cv.warpPerspective(src, dst, M, dSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

        cv.imshow(canvasOut, dst);
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
        handleSize();

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

    function handleSize() {
        ({ top, left, width, height } = videoElem.getBoundingClientRect());

        if (src) src.delete();
        if (dst) dst.delete();

        src = new cv.Mat(height, width, cv.CV_8UC4);
        dst = new cv.Mat(height, width, cv.CV_8UC4);

        render("handleSize");
    }

    function handleStart() {
        isDragging = true;
    }

    function handleEnd() {
        circle = undefined;
        isDragging = false;

        for (let i = 0; i < corners.length; i++) {
            let c = corners[i];
            c.focused = false;
        }

        render("handleEnd");
    }

    function handleMove({ offsetX: x, offsetY: y }) {
        if (!isDragging) return;

        if (!circle) {
            for (let i = 0; i < corners.length; i++) {
                let c = corners[i];
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

            updatePerspectiveTransformMatrix();

            render("handleMove");
        }
    }

    function updatePerspectiveTransformMatrix() {
        let { width: W, height: H } = getDimensions(corners);

        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
            corners[0].x,
            corners[0].y,
            corners[1].x,
            corners[1].y,
            corners[2].x,
            corners[2].y,
            corners[3].x,
            corners[3].y,
        ]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 0, H - 1, W - 1, H - 1, W - 1, 0]);

        M = cv.getPerspectiveTransform(srcTri, dstTri);
        dSize = new cv.Size(W, H);
    }

    function handleTouchMove(e) {
        const { clientX, clientY } = e.touches[0];
        handleMove({
            x: clientX - left,
            y: clientY - top,
        });
    }

    function render(caller) {
        if (!corners || !corners.length) {
            console.log("corners");
            console.log(corners);
            return;
        }

        ctxCorners.clearRect(0, 0, width, height);

        for (let i = 0; i < corners.length; i++) {
            const c = corners[i];
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
        ctxCorners.beginPath();
        ctxCorners.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < corners.length; i++) {
            const c = corners[i];
            ctxCorners.lineTo(c.x, c.y);
        }
        ctxCorners.closePath();
        ctxCorners.fill();
        ctxCorners.stroke();
    }
</script>
