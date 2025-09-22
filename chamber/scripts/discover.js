const grid = document.getElementById("discover-grid");
const visit = document.querySelector("#visit-info .message");

async function getPlaces() {
  try {
    const response = await fetch("data/discover.json");
    const places = await response.json();
    displayPlaces(places);
  } catch (err) {
    console.log("Error loading places: ", err);
  }
}

function displayPlaces(places) {
  places.forEach((place) => {
    const card = document.createElement("article");
    card.className = "place-card";
    card.setAttribute("data-id", place.id);
    const h2 = document.createElement("h2");
    h2.textContent = place.name;
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = place.image;
    image.alt = place.name;
    image.width = 300;
    image.height = 200;

    const figc = document.createElement("figcaption");
    figc.textContent = place.name;
    figure.append(image, figc);

    const address = document.createElement("address");
    address.textContent = place.address;

    const p = document.createElement("p");
    p.textContent = place.description;

    const btn = document.createElement("button");
    btn.className = "learn-more";
    btn.type = "button";
    btn.textContent = "Learn More";
    btn.addEventListener("click", () => {
      alert(`${place.name}\n\n${place.description}\n\n${place.address}`);
    });
    card.append(h2, figure, address, p, btn);
    grid.append(card);
  });
}

function visitMessage() {
  const lastVisit = localStorage.getItem("last_visit");
  const now = Date.now();
  let message = "Welcome! Let us know if you have any questions.";

  if (lastVisit) {
    const difference = now - Number(lastVisit);
    console.log(now, lastVisit, difference);
    const days = Math.floor(difference / (24 * 60 * 60 * 1000));
    if (difference < 24 * 60 * 60 * 1000) {
      message = "Back so soon! Awesome";
    } else if (days === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }
  visit.textContent = message;
  localStorage.setItem("last_visit", String(now));
}

visitMessage();
getPlaces();
