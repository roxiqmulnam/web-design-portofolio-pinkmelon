let section = document.querySelectorAll("section");
let lists = document.querySelectorAll(".text-desc");
let buttonToTop = document.querySelector(".button--to-top");

const activeLink = (li) => {
  lists.forEach((item) => item.classList.remove("active"));
  li.classList.add("active");
};
lists.forEach((item) =>
  item.addEventListener("click", () => {
    activeLink(this);
  })
);

const scrollFunction = () => {
  buttonToTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    buttonToTop.style.display = "block";
  } else {
    buttonToTop.style.display = "none";
  }
};

window.onscroll = () => {
  for (let i = 0; i < section.length; i++) {
    let idSection = section[i];
    let top = window.scrollY;
    let offset = idSection.offsetTop - 150;
    let height = idSection.offsetHeight - 400;
    let id = idSection.getAttribute("id");
    if (top >= offset && top < offset + height) {
      const target = document.querySelector(`[href='#${id}']`);
      activeLink(target);
    }
  }
  scrollFunction();
};

// active hover

const navbar = document.querySelector(".navbar__menu");
for (let i = 0; i < lists.length; i++) {
  lists[i].addEventListener("click", function () {
    let current = document.querySelectorAll(".active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

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

const wrapper = document.querySelector(".slider-wrap");

let pressed = false;
let startX = 0;

wrapper.addEventListener("mousedown", function (e) {
  pressed = true;
  startX = e.clientX;
  this.style.cursor = "grabbing";
});

wrapper.addEventListener("mouseleave", function (e) {
  pressed = false;
});

window.addEventListener("mouseup", function (e) {
  pressed = false;
  wrapper.style.cursor = "grab";
});

wrapper.addEventListener("mousemove", function (e) {
  if (!pressed) {
    return;
  }
  e.preventDefault();
  this.scrollLeft += startX - e.clientX;
});
