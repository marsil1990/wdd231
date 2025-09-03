const cards = document.getElementById("sections");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json"); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    // console.table(data); // Output the fetched data
    displayMembers(data); // note that you reference the prophets array of the JSON data object, not just the object
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};

const displayMembers = (members) => {
  // card build code goes here
  members.forEach((member) => {
    // card build code goes here
    const card = document.createElement("section");
    const address = document.createElement("p");
    const web = document.createElement("a");
    const phone = document.createElement("p");
    const name = document.createElement("p");
    const logo = document.createElement("img");
    name.classList.add("name");
    name.textContent = `${member.name}`;
    phone.textContent = `${member.phone}`;
    web.textContent = `${member.website}`;
    address.textContent = `${member.address}`;
    address.classList.add("adress");
    phone.classList.add("phone");
    logo.setAttribute("src", `${member.logo}`);
    logo.setAttribute("alt", `${member.name} `);
    web.setAttribute("href", `${member.website}`);
    logo.setAttribute("width", "200");
    logo.setAttribute("height", "200");
    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(web);
    cards.appendChild(card);
    cards.classList.add("grid");
  });
};

gridBtn.addEventListener("click", () => {
  cards.classList.add("grid");
  cards.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  cards.classList.add("list");
  cards.classList.remove("grid");
});

getMembers();
