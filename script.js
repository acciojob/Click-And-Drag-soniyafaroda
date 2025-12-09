const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Position cubes in grid initially
let positions = [
    { x: 10, y: 10 },
    { x: 210, y: 10 },
    { x: 10, y: 210 },
    { x: 210, y: 210 }
];

cubes.forEach((cube, index) => {
    cube.style.left = positions[index].x + "px";
    cube.style.top = positions[index].y + "px";

    cube.addEventListener("mousedown", (e) => {
        activeCube = cube;
        cube.classList.add("dragging");

        // Mouse offset inside cube
        offsetX = e.clientX - cube.offsetLeft;
        offsetY = e.clientY - cube.offsetTop;

        document.addEventListener("mousemove", dragCube);
        document.addEventListener("mouseup", dropCube);
    });
});

function dragCube(e) {
    if (!activeCube) return;

    let containerRect = container.getBoundingClientRect();

    let newX = e.clientX - offsetX - containerRect.left;
    let newY = e.clientY - offsetY - containerRect.top;

    // Apply boundaries
    newX = Math.max(0, Math.min(newX, containerRect.width - activeCube.offsetWidth));
    newY = Math.max(0, Math.min(newY, containerRect.height - activeCube.offsetHeight));

    activeCube.style.left = newX + "px";
    activeCube.style.top = newY + "px";
}

function dropCube() {
    if (activeCube) {
        activeCube.classList.remove("dragging");
    }

    document.removeEventListener("mousemove", dragCube);
    document.removeEventListener("mouseup", dropCube);

    activeCube = null;
}
