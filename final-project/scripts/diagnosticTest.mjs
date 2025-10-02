function decodeHTML(s) {
  const t = document.createElement("textarea");
  t.innerHTML = s;
  return t.value;
}
function randomChoices(arr) {
  let index = [0, 1, 2, 3];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * index.length);
    result.push(arr[index[j]]);
    index.splice(j, 1);
  }
  return result;
}

function joinQuestionsAnswers(questions) {
  let join =
    questions
      .map(
        (q, i) => `
    <fieldset>
      <legend>Q${i + 1}. ${q.q}</legend>
      ${q.choices
        .map(
          (c) =>
            `<label><input type="radio" name="q${i}" value="${c}"> ${c}</label>`
        )
        .join("")}
    </fieldset>
  `
      )
      .join("") + `<button class="btn" id="submit-quiz">Submit</button>`;
  return join;
}

function renderQuiz(mount, questions) {
  let questionshtml = joinQuestionsAnswers(questions);
  mount.innerHTML = questionshtml;
  // Calculate result
  mount.querySelector("#submit-quiz").addEventListener("click", () => {
    let correct = 0;
    questions.forEach((q, i) => {
      const chosen = mount.querySelector(`input[name="q${i}"]:checked`);
      if (chosen && chosen.value === q.correct) correct++;
    });
    const percent = Math.round((correct / questions.length) * 100);
    const level =
      percent >= 80 ? "advanced" : percent >= 50 ? "intermediate" : "beginner";

    // Persist
    localStorage.setItem("mc_diagnostic", JSON.stringify({ percent, level }));
    results();

    // Show messages inside dialog
    const dialog = document.querySelector("#diag-dialog");
    dialog.querySelector(
      "#diag-result"
    ).textContent = `Your score: ${percent}% — Estimated level: ${level.toUpperCase()}.`;
    if (level === "beginner") {
      dialog.querySelector("#recommendation").textContent =
        "We recommend starting with BEGINNER courses.";
    } else if (level === "intermediate") {
      dialog.querySelector("#recommendation").textContent =
        "You can start with INTERMEDIATE courses";
    } else {
      dialog.querySelector("#recommendation").textContent =
        "Great! Try ADVANCED courses.";
    }
  });
}

async function startDiagnostic() {
  const dialog = document.querySelector("#diag-dialog");
  const mount = dialog.querySelector("#quiz");
  mount.textContent = "loading ...";
  const resultP = dialog.querySelector("#diag-result");
  const recP = dialog.querySelector("#recommendation");

  if (!localStorage.getItem("mc_diagnostic")) {
    if (resultP) resultP.textContent = "";
    if (recP) recP.textContent = "";
  }

  try {
    // Fetch 10 math questions (category 19)
    const url =
      "https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple";
    const respose = await fetch(url);
    const data = await respose.json();

    if (data.results.length !== 0) {
    }
    const questions = data.results.map((item) => {
      const q = decodeHTML(item.question);
      const correct = decodeHTML(item.correct_answer);
      let answers = [];
      answers.push(correct);
      item.incorrect_answers.forEach((element) => {
        answers.push(decodeHTML(element));
      });
      const choices = randomChoices(answers);
      return { q, correct, choices };
    });

    if (questions.length) renderQuiz(mount, questions);
  } catch (err) {
    console.error(err);
    mount.innerHTML = `
      <p>Could not load the diagnostic quiz right now.</p>`;
  }
}

export function initDiagnostic() {
  const btn = document.querySelector("#start-quiz");
  const dialog = document.querySelector("#diag-dialog");

  if (btn && dialog) {
    btn.addEventListener("click", () => {
      dialog.showModal();
      startDiagnostic();
    });

    const close = document.getElementById("close");
    close.addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("close", () => {
      const mount = dialog.querySelector("#quiz");
      if (mount) mount.innerHTML = "";
    });
  }
}

export function results() {
  // Restore previous result
  const saved = localStorage.getItem("mc_diagnostic");
  if (saved) {
    const diagnostic = document.getElementById("diagnostic");
    const { percent, level } = JSON.parse(saved);
    diagnostic.textContent = `Your score: ${percent}%  `;
    diagnostic.textContent +=
      level === "beginner"
        ? " - We recommend starting with BEGINNER courses."
        : level === "intermediate"
        ? "You can start with INTERMEDIATE courses."
        : "Great! Try ADVANCED courses.";

    const recommen = document.getElementById("diag");
    const close = document.getElementById("btn-close-dg");
    close.classList.remove("hide");
    close.addEventListener("click", () => {
      recommen.classList.add("hide");
    });
  }
}
