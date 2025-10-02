import toggleNavigation from "./navigation.mjs";
import { date } from "./dates.mjs";
import { renderCourses } from "./output.mjs";
import { initDiagnostic, results } from "./diagnosticTest.mjs";

const main = document.querySelector("main");
const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");
const logoName = document.querySelector(".name-logo");
const logo = document.querySelector(".logo");
const all = document.getElementById("all");
const beginner = document.getElementById("beginner");
const intermediate = document.getElementById("intermediate");
const advanced = document.getElementById("advanced");
const sectionCoureseCard = document.getElementById("courses-cards");

const getCourses = async () => {
  try {
    const response = await fetch("data/courses.json"); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    // console.table(data); // Output the fetched data
    return data; // note that you reference the prophets array of the JSON data object, not just the object
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};

navButton.addEventListener("click", () => {
  toggleNavigation(navButton, navBar, logoName, logo);
});

all.addEventListener("click", async () => {
  main.classList.add("main-courses");
  main.classList.remove("main-BIA");
  renderAllcourses();
});

beginner.addEventListener("click", async () => {
  const allCourses = await getCourses();
  main.classList.add("main-BIA");
  main.classList.remove("main-courses");
  renderCourses(allCourses.Beginner, sectionCoureseCard);
});

advanced.addEventListener("click", async () => {
  const allCourses = await getCourses();
  main.classList.add("main-BIA");
  main.classList.remove("main-courses");
  renderCourses(allCourses.Advanced, sectionCoureseCard);
});

intermediate.addEventListener("click", async () => {
  const allCourses = await getCourses();
  main.classList.remove("main-courses");
  main.classList.add("main-BIA");
  renderCourses(allCourses.Intermediate, sectionCoureseCard);
});

async function renderAllcourses() {
  const allCourses = await getCourses();
  let courses = [];
  allCourses.Beginner.forEach((element) => {
    courses.push(element);
  });
  allCourses.Intermediate.forEach((element) => {
    courses.push(element);
  });
  allCourses.Advanced.forEach((element) => {
    courses.push(element);
  });
  renderCourses(courses, sectionCoureseCard);
}
main.classList.add("main-courses");
renderAllcourses();
results();
date();
initDiagnostic();
