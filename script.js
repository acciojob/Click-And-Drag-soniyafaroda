const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

/* ----------------------------------
   1. PLACE CUBES IN A DEFAULT GRID
-----------------------------------*/
function placeCubesInGrid() {
    const cubeSize = 80;  // must match CSS width/height
    const gap = 10;

    let x = 0, y = 0;

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

/* ----------------------------------
   2. MOUSE DOWN → SELECT CUBE
-----------------------------------*/
cubes.forEach(cube => {
    cube.addEventListener("mousedown", (e) => {
        activeCube = cube;

        const rect = cube.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        cube.style.zIndex = 1000; // bring to front
    });
});

/* ----------------------------------
   3. MOUSE MOVE → DRAG CUBE
-----------------------------------*/
document.addEventListener("mousemove", (e) => {
    if (!activeCube) return;

    const containerRect = container.getBoundingClientRect();

    // Calculate new coordinates
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop  = e.clientY - containerRect.top - offsetY;

    // Apply boundary constraints
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - activeCube.offsetWidth));
    newTop  = Math.max(0, Math.min(newTop, containerRect.height - activeCube.offsetHeight));

    activeCube.style.left = newLeft + "px";
    activeCube.style.top = newTop + "px";
});

/* ----------------------------------
   4. MOUSE UP → RELEASE CUBE
-----------------------------------*/
document.addEventListener("mouseup", () => {
    if (activeCube) {
        activeCube.style.zIndex = 1;
        activeCube = null;
    }
});
