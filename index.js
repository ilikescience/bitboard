// hi rez = 90x72
// lo rez = 30x24
const cols = 90;
const rows = 72;

const coordsToFlat = (x, y) => x + (y * cols);
const flatToCoords = (i) => [i % cols, Math.floor(i / cols)];

const data = new Array(cols * rows).fill(0);

const setup = () => {
    // resize the canvas to the right size
    const canvas = document.querySelector('canvas');
    canvas.style.width = `${cols}px`;
    canvas.style.height = `${rows}px`;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return ctx;
}

const draw = (ctx, t) => {
    // transform data into pixels
    const pixels = [];
    data.map((value, i) => {
        const xVal = (Math.sin((((i + (t / 50)) % cols) / cols) * Math.PI)) * 255;
        pixels.push(xVal, xVal, xVal, 255);
    })
    // render pixels onto canvas
    const imageData = ctx.createImageData(cols, rows);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    window.requestAnimationFrame((t) => {
        draw(ctx, t);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const ctx = setup();
    window.requestAnimationFrame((t) => {
        draw(ctx, t);
    });
});