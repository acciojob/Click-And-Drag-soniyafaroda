// Your code here.
const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Initial grid placement (optional)
function placeCubesInGrid() {
    let x = 0, y = 0;
    const cubeSize = 80;
    const gap = 10;

    cubes.forEach(cube => {
        cube.style.left = x + "px";
        cube.style.top = y + "px";

        x += cubeSize + gap;

        if (x + cubeSize > container.clientWidth) {
            x = 0;
            y += cubeSize + gap;
        }
    });
}
placeCubesInGrid();

// Mouse down → select cube
cubes.forEach(cube => {
    cube.addEventListener("mousedown", (e) => {
        activeCube = cube;
        const rect = cube.getBoundingClientRect();

        // Store mouse offset inside cube
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        cube.style.zIndex = 1000; // Bring to front
    });
});

// Mouse move → drag cube
document.addEventListener("mousemove", (e) => {
    if (!activeCube) return;

    const containerRect = container.getBoundingClientRect();

    // Compute new position (centered on mouse)
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Boundary limits
    newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - activeCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, container.clientHeight - activeCube.offsetHeight));

    // Apply position
    activeCube.style.left = newLeft + "px";
    activeCube.style.top = newTop + "px";
});

// Mouse up → drop cube
document.addEventListener("mouseup", () => {
    if (activeCube) {
        activeCube.style.zIndex = 1;
    }
    activeCube = null;
});
