const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

const getProphetData = async () => {
  try {
    const response = await fetch(url); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    // console.table(data); // Output the fetched data
    displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};

const displayProphets = (prophets) => {
  // card build code goes here
  prophets.forEach((prophet) => {
    // card build code goes here
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const birth = document.createElement("p");
    const birthPlace = document.createElement("p");
    birth.textContent = `Date of birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    const portrait = document.createElement("img");
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute("src", `${prophet.imageurl}`);
    portrait.setAttribute("alt", `${fullName} prophet`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");
    card.appendChild(fullName);
    card.appendChild(birth);
    card.appendChild(birthPlace);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};

getProphetData();
