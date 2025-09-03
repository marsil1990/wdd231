const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");
const logoName = document.querySelector(".name-logo");
const logo = document.querySelector(".logo");

navButton.addEventListener("click", () => {
  navButton.classList.toggle("show");
  navBar.classList.toggle("show");
  logoName.classList.toggle("show");
  logo.classList.toggle("show-img");
});
