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
</style>

<svelte:window on:resize={handleSize} />

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

<script>
    import { onMount } from "svelte";

    export let circles = [];
    export let width, height, top, left;

    let canvasElem;
    let ctxCorners;
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
        ctxCorners = canvasElem.getContext("2d", { alpha: true, willReadFrequently: true });
        ctxCorners.imageSmoothingEnabled = false;

        setupCanvas();
    });
</script>
