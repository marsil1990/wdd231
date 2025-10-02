export function renderCoursesRandom(courses, section) {
  let randomCourses = randomItem(courses);
  randomCourses.forEach((element) => {
    const art = document.createElement("article");
    const h3 = document.createElement("h3");
    h3.className = "card-title";
    h3.textContent = `${element.level} Course`;
    art.className = "home-card";
    const img = document.createElement("img");
    img.setAttribute("src", `${element.image}`);
    img.setAttribute("alt", `${element.title} image`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "150");
    img.setAttribute("height", "150");
    const p = document.createElement("p");
    p.className = "summary";
    p.textContent = element.summary;
    art.append(h3, img, p);
    section.appendChild(art);
  });
}

export function renderCourses(courses, section) {
  section.innerHTML = "";
  courses.forEach((element) => {
    const art = document.createElement("article");
    const h3 = document.createElement("h3");
    h3.className = "card-title";
    h3.textContent = `${element.level} Course`;
    art.className = "home-card";
    const img = document.createElement("img");
    img.setAttribute("src", `${element.image}`);
    img.setAttribute("alt", `${element.title} image`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "150");
    img.setAttribute("height", "150");
    const p = document.createElement("p");
    p.className = "summary";
    p.textContent = element.summary;
    art.append(h3, img, p);
    section.appendChild(art);
  });
}

// 1 beginner, 1 intermediate and 1 advanced
function randomItem(courses) {
  if (courses.length == 0) return undefined; // o lanza un error  0 1 2 3 4 6
  let result = [];
  result.push(
    courses.Beginner[Math.floor(Math.random() * courses.Beginner.length)]
  );
  result.push(
    courses.Intermediate[
      Math.floor(Math.random() * courses.Intermediate.length)
    ]
  );
  result.push(
    courses.Advanced[Math.floor(Math.random() * courses.Advanced.length)]
  );
  return result;
}
