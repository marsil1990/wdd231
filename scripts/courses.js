const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const ul = document.getElementById("course-list");
const cse = document.getElementById("cse");
const wdd = document.getElementById("wdd");
const all = document.getElementById("all");
const totalCredits = document.getElementById("credits");
const subjectNumber = document.getElementById("subjectNumber");
const creditsCourse = document.getElementById("creditsCourse");
const certificateCourse = document.getElementById("certificateCourse");
const description = document.getElementById("description");
const dialog = document.querySelector("dialog");
const dialogButton = document.getElementById("dialog-button");
const technology = document.getElementById("technology");

function course(c) {
  if (c.completed) {
    return `<li class="completed"><button id="${c.number}" class="courses-button"> &#10003 ${c.subject} ${c.number} </button></li>`;
  } else {
    return `<li><button id="${c.number}" class="courses-button"> ${c.subject} ${c.number}</button></li>`;
  }
}

function filterAll(courses) {
  const credits = courses.reduce((a, e) => {
    return a + e.credits;
  }, 0);
  totalCredits.textContent = `${credits}`;
  const html = courses.map((e) => course(e));
  render(html.join(""));
}

function filterCSE(courses) {
  const cse = courses.filter((e) => e.subject === "CSE");
  const credits = cse.reduce((a, e) => {
    return a + e.credits;
  }, 0);
  totalCredits.textContent = `${credits}`;
  const html = cse.map((e) => course(e));
  render(html.join(""));
}

function filterWDD(courses) {
  const wdd = courses.filter((e) => e.subject === "WDD");
  const credits = wdd.reduce((a, e) => {
    return a + e.credits;
  }, 0);
  totalCredits.textContent = `${credits}`;
  const html = wdd.map((e) => course(e));
  render(html.join(""));
}

function render(html) {
  ul.innerHTML = html;
  dialogButtons();
}

all.addEventListener("click", () => {
  filterAll(courses);
});

cse.addEventListener("click", () => {
  filterCSE(courses);
});

wdd.addEventListener("click", () => {
  filterWDD(courses);
});

filterAll(courses);

function dialogButtons() {
  const courseButtons = document.querySelectorAll(".courses-button");
  courseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let c = courses.findIndex((course) => course.number == parseInt(btn.id));
      console.log(btn.id, courses[c]);
      subjectNumber.textContent = `${courses[c].subject} ${courses[c].number}`;
      creditsCourse.textContent = `${courses[c].credits} credits`;
      certificateCourse.textContent = `Certificate: ${courses[c].certificate}`;
      description.textContent = `${courses[c].description}`;
      technology.textContent =
        "technology: " + courses[c].technology.join(", ");
      dialog.showModal();
    });
  });
}

dialogButton.addEventListener("click", () => {
  dialog.close();
});
