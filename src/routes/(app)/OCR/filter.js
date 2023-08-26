export function filterLuma(imgData , lumaMin = 0.0 , lumaMinSmooth = 0.0 , lumaMax = 1.0 , lumaMaxSmooth = 0.0 ) {
    const lumaCoef = [0.2989, 0.587, 0.114, 0.0];

    let d = imgData.data;
    let i = 0;
    let l = d.length;

    while (l-- > 0) {
        let rgb = [d[i], d[i + 1], d[i + 2]];
        let alpha = d[i + 3];
        rgb = [Math.max(0.0, rgb[0] / alpha), Math.max(0.0, rgb[1] / alpha), Math.max(0.0, rgb[2] / alpha)];
        let rgba = [...rgb, alpha];

        const luminance = dot(rgba, lumaCoef);

        let clo = smoothstep(luminance, lumaMin, lumaMin + lumaMinSmooth);
        let chi = 1.0 - smoothstep(luminance, lumaMax - lumaMaxSmooth, lumaMax);

        let amask = clo * chi;
        d[i + 3] = amask * 255.0;

        i += 4;
    }

    return imgData;
}


export function filterThreshold(imgData, lowerThreshold = 0, upperThreshold = 255) {
    let d = imgData.data;
    let i = 0;
    let l = d.length;
    while (l-- > 0) {
        const v = d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722;
        if (v < lowerThreshold) [d[i], d[i + 1], d[i + 2]] = [0, 0, 0];
        if (v > upperThreshold) [d[i], d[i + 1], d[i + 2]] = [255, 255, 255];
        i += 4;
    }
    return imgData;
}





function dot(lhs, rhs) {
    let d = 0.0;
    for (let i = 0; i < lhs.length; i++) {
        d += lhs[i] * rhs[i];
    }
    return d;
}

function smoothstep(x, edge0 = 0.0, edge1 = 1.0) {
    x = clamp((x - edge0) / (edge1 - edge0));
    return x * x * (3.0 - 2.0 * x);
}

function clamp(value, min = 0.0, max = 1.0) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}