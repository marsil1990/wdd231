import { join } from "./join.mjs";
import toggleNavigation from "./navigation.mjs";
import { date } from "./dates.mjs";
const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");
const logoName = document.querySelector(".name-logo");
const logo = document.querySelector(".logo");

navButton.addEventListener("click", () => {
  toggleNavigation(navButton, navBar, logoName, logo);
});
date();
join();
