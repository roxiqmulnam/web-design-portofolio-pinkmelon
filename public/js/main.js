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
// const container = document.querySelector(".highlight-works");
// const slider = document.querySelector(".slider-wrap");

// let isPressedDown = false;
// let cursorXSpace;

// container.addEventListener("mousedown", (e) => {
//   isPressedDown = true;
//   cursorXSpace = e.offsetX - slider.offsetLeft;
//   container.style.cursor = "grabbing";
// });

// container.addEventListener("mouseup", () => {
//   container.style.cursor = "grab";
// });

// window.addEventListener("mouseup", () => {
//   isPressedDown = false;
// });

// container.addEventListener("mousemove", (e) => {
//   if (!isPressedDown) return;
//   e.preventDefault();
//   slider.style.left = `${e.offsetX - cursorXSpace}px`;
//   boundslider();
// });

// function boundslider() {
//   const container_rect = container.getBoundingClientRect();
//   const slider_rect = slider.getBoundingClientRect();

//   return parseInt(slider.style.left) > 0
//     ? (slider.style.left = 0)
//     : slider_rect.right < container_rect.right
//     ? (slider.style.left = `-${slider_rect.width - container_rect.width}px`)
//     : "";
// }

const slider = document.querySelector('.slider-wrap'),
  slides = Array.from(document.querySelectorAll('.item'))

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)
  // mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mousemove', touchMove)
  slide.addEventListener('mouseleave', touchEnd)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}