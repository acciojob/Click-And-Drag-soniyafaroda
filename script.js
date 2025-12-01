const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

/* -------------------------------------------------
   1. PLACE CUBES IN A GRID ON LOAD
--------------------------------------------------*/
function placeCubesInGrid() {
    const size = 80;   // must match your CSS cube size
    const gap = 10;

    let x = 0;
    let y = 0;

    cubes.forEach(cube => {
        cube.style.left = x + "px";
