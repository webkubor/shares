export function getAttr() {
    const scriptElements = document.getElementsByTagName("script");
    const script = scriptElements[scriptElements.length - 1];

    return {
        zIndex: script.getAttribute("zIndex") || -1,
        opacity: script.getAttribute("opacity") || 0.5,
        color: script.getAttribute("color") || "0,0,0",
        count: script.getAttribute("count") || 99
    };
}

export function getWindowWH(canvas) {
    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

export function createSquare() {
    const { innerWidth, innerHeight } = window;
    const { count } = getAttr();

    return Array.from({ length: count }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        xa: Math.random() * 2 - 1,
        ya: Math.random() * 2 - 1,
        max: 6000
    }));
}

export function createMouse() {
    return {
        x: null,
        y: null,
        max: 20000
    };
}

export function handleMouseMove(mouse) {
    return function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };
}

export function handleMouseOut(mouse) {
    return function () {
        mouse.x = null;
        mouse.y = null;
    };
}

export function drawCanvas(ctx, squares, mouse) {
    const { innerWidth, innerHeight } = window;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    squares.forEach(square => {
        square.x += square.xa;
        square.y += square.ya;

        square.xa = square.xa * (square.x > innerWidth || square.x < 0? -1 : 1);
        square.ya = square.ya * (square.y > innerHeight || square.y < 0? -1 : 1);

        ctx.fillRect(square.x - 0.5, square.y - 0.5, 1, 1);

        const w = [mouse,...squares];
        for (let i = 0; i < w.length; i++) {
            const x = w[i];
            if (square!== x && x.x!== null && x.y!== null) {
                const xDiff = square.x - x.x;
                const yDiff = square.y - x.y;
                const distance = xDiff * xDiff + yDiff * yDiff;

                if (distance < x.max) {
                    if (x === mouse && distance > x.max / 2) {
                        square.x -= 0.03 * xDiff;
                        square.y -= 0.03 * yDiff;
                    }

                    const A = (x.max - distance) / x.max;
                    ctx.beginPath();
                    ctx.lineWidth = A / 2;
                    ctx.strokeStyle = `rgba(${getAttr().color},${A + 0.2})`;
                    ctx.moveTo(square.x, square.y);
                    ctx.lineTo(x.x, x.y);
                    ctx.stroke();
                }
            }
        }

        w.splice(w.indexOf(square), 1);
    });

    requestAnimationFrame(() => drawCanvas(ctx, squares, mouse));
}