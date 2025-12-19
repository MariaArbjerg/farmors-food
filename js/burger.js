const burger = document.querySelector(".burger");
const navMenu = document.querySelector("nav ul");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
});


const searchToggle = document.querySelector(".search-toggle");
const searchWrapper = document.querySelector(".search-wrapper");
const searchInput = document.querySelector(".search-input");

searchToggle.addEventListener("click", () => {
  searchWrapper.classList.toggle("active");
  searchInput.focus();
});

// Luk hvis man klikker udenfor
document.addEventListener("click", (e) => {
  if (!searchWrapper.contains(e.target)) {
    searchWrapper.classList.remove("active");
  }
});