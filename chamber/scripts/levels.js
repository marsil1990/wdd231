const memberships = [
  {
    id: "np",
    title: "NP (Non-Profit) Membership Level",
    short: "Free for non-profits",
    benefits: [
      "No membership fee",
      "Community events access",
      "Basic directory listing",
    ],
  },
  {
    id: "bronze",
    title: "Bronze Membership Level",
    short: "Basic benefits + networking",
    benefits: [
      "All NP benefits",
      "Networking events",
      "Quarterly newsletter mentions",
    ],
  },
  {
    id: "silver",
    title: "Silver Membership Level",
    short: "More visibility and discounts",
    benefits: [
      "All Bronze benefits",
      "Exclusive training sessions",
      "Discounts on paid events",
    ],
  },
  {
    id: "gold",
    title: "Gold Membership Level",
    short: "Premium visibility",
    benefits: [
      "All Silver benefits",
      "Homepage spotlight placement",
      "Premium advertising packages",
    ],
  },
];

const cardsContainer = document.querySelector(".cards");
const body = document.querySelector("body");

if (cardsContainer) {
  memberships.forEach((m, i) => {
    const card = document.createElement("article");
    card.className = `card card${i + 1}`;
    card.innerHTML = `
    <h3>${m.title}</h3>
    <p>${m.short}</p>
    <button class="card-link" id="dlg-${m.id}">Learn More</button>
  `;
    cardsContainer.appendChild(card);

    const dialog = document.createElement("dialog");
    dialog.id = `dlg-${m.id}`;
    dialog.className = "dialog-card";
    dialog.innerHTML = `
    <h3>${m.title}</h3>
    <ul>
      ${m.benefits.map((b) => `<li>${b}</li>`).join("")}
    </ul>
    <button value="close" class="close">❌</button>
  `;
    body.appendChild(dialog);
  });
}

const dialogs = document.querySelectorAll("dialog");
const cardsDialog = document.querySelectorAll(".card-link");

cardsDialog.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    dialogs[i].showModal();
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.closest("dialog").close();
  }
});

//  THANK YOU
const tsField = document.getElementById("timestamp");
if (tsField) {
  tsField.value = new Date().toISOString();
}
const outFname = document.getElementById("out-firstName");
const outLname = document.getElementById("out-lastName");
const outEmail = document.getElementById("out-email");
const outMobile = document.getElementById("out-mobile");
const outName = document.getElementById("out-organization");
const outTime = document.getElementById("out-timestamp");

const params = new URLSearchParams(window.location.search);
if (outFname) outFname.textContent = params.get("firstName") || "";
if (outLname) outLname.textContent = params.get("lastName") || "";
if (outEmail) outEmail.textContent = params.get("email") || "";
if (outMobile) outMobile.textContent = params.get("mobile") || "";
if (outName) outName.textContent = params.get("organization") || "";

// timestamp
if (outTime) {
  const ts = params.get("timestamp");
  if (ts) {
    const d = new Date(ts);
    outTime.textContent = isNaN(d) ? ts : d.toLocaleString();
  } else {
    outTime.textContent = "";
  }
}
