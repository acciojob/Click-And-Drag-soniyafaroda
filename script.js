const container = document.getElementById("items");
const cubes = document.querySelectorAll(".cube");

cubes.forEach(cube => {
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    cube.style.cursor = "grabbing";

    offsetX = e.clientX - cube.getBoundingClientRect().left;
    offsetY = e.clientY - cube.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let x = e.clientX - offsetX - container.getBoundingClientRect().left;
    let y = e.clientY - offsetY - container.getBoundingClientRect().top;

    // Prevent cubes from leaving container
    x = Math.max(0, Math.min(x, container.clientWidth - cube.clientWidth));
    y = Math.max(0, Math.min(y, container.clientHeight - cube.clientHeight));

    cube.style.left = x + "px";
    cube.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    cube.style.cursor = "grab";
  });
});
