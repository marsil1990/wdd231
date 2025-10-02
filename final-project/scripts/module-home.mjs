import toggleNavigation from "./navigation.mjs";
import { date } from "./dates.mjs";
import { renderCoursesRandom } from "./output.mjs";
const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");
const logoName = document.querySelector(".name-logo");
const logo = document.querySelector(".logo");
const sectionHomecards = document.getElementById("home-cards");

const getCourses = async () => {
  try {
    const response = await fetch("data/courses.json"); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    // console.table(data); // Output the fetched data
    renderCoursesRandom(data, sectionHomecards); // note that you reference the prophets array of the JSON data object, not just the object
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};

navButton.addEventListener("click", () => {
  toggleNavigation(navButton, navBar, logoName, logo);
});

getCourses();
date();
