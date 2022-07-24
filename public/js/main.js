// mobile navbar
const mobileMenu = document.querySelector(".btn-mobile-navbar");
const linkNavbar = document.querySelector(".mobile-navbar");

mobileMenu.addEventListener("click", function () {
  linkNavbar.classList.toggle("open");
});
linkNavbar.addEventListener("click", function () {
  linkNavbar.classList.remove("open");
});

// slider
const container = document.querySelector(".highlight-works");
const slider = document.querySelector(".slider-wrap");

let isPressedDown = false;
let cursorXSpace;

container.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  cursorXSpace = e.offsetX - slider.offsetLeft;
  container.style.cursor = "grabbing";
});

container.addEventListener("mouseup", () => {
  container.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  slider.style.left = `${e.offsetX - cursorXSpace}px`;
  boundslider();
});

function boundslider() {
  const container_rect = container.getBoundingClientRect();
  const slider_rect = slider.getBoundingClientRect();

  return parseInt(slider.style.left) > 0
    ? (slider.style.left = 0)
    : slider_rect.right < container_rect.right
    ? (slider.style.left = `-${slider_rect.width - container_rect.width}px`)
    : "";
}
