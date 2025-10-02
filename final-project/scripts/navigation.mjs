function toggleNavigation(navButton, navBar, logoName, logo) {
  navButton.classList.toggle("show");
  navBar.classList.toggle("show");
  logoName.classList.toggle("show");
  logo.classList.toggle("show-img");
}

export default toggleNavigation;
