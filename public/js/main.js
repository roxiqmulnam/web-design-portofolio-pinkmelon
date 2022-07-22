// slider 
// var sliderMain = document.getElementById('slider-main')
// var item = sliderMain.getElementsByClassName('items')
// function next() {
//     sliderMain.append(item[0]);
// }
// function prev() {
//     sliderMain.prepend(item[item.length - 1]);
// }

const mobileMenu = document.querySelector(".btn-mobile-navbar");
const linkNavbar = document.querySelector(".mobile-navbar");

mobileMenu.addEventListener("click", function () {
  linkNavbar.classList.toggle("open");
});
linkNavbar.addEventListener("click", function () {
  linkNavbar.classList.remove("open");
});