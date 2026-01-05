const burger = document.querySelector(".burger");
const navMenu = document.querySelector("nav ul");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
});


