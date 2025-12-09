const container = document.getElementById("items");
const cubes = document.querySelectorAll(".cube");

let isDragging = false;
let activeCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
  // Place cubes in grid initially
  cube.style.left = (Math.random() * 200) + "px";
  cube.style.top = (Math.random() * 200) + "px";

  cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    activeCube = cube;
    cube.classList.add("dragging");

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  x = Math.max(0, Math.min(x, containerRect.width - cubeRect.width));
  y = Math.max(0, Math.min(y, containerRect.height - cubeRect.height));

  activeCube.style.left = x + "px";
  activeCube.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (activeCube) activeCube.classList.remove("dragging");
  isDragging = false;
  activeCube = null;
});
