// const cards = document.getElementById("sections");
// const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("specific-business");

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json"); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    // console.table(data); // Output the fetched data
    displayMembersRandom(data); // note that you reference the prophets array of the JSON data object, not just the object
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};

const displayMembersRandom = (members) => {
  // card build code goes here
  members.forEach((member) => {
    // card build code goes here
    const card = document.createElement("section");
    const address = document.createElement("p");
    const web = document.createElement("a");
    const phone = document.createElement("p");
    const name = document.createElement("p");
    const logo = document.createElement("img");
    const memberLevel = document.createElement("p");
    memberLever.textContent = `${member.membershipLevel}`;
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
    web.setAttribute("target", "_blank");
    web.setAttribute("rel", "noopener");
    logo.setAttribute("width", "60");
    logo.setAttribute("height", "60");
    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(web);
    cards.appendChild(card);
    cards.classList.add("grid");
  });
};

function randomItem(members) {
  if (members.length == 0) return undefined; // o lanza un error  0 1 2 3 4 5
  let member = [];
  let count = 0;
  let result = [];
  for (let i = 0; i < members.length; i++) member.push(i);
  let i;
  while (count < 3 && member.length > 0) {
    i = Math.floor(Math.random() * member.length);
    member.splice(i, 1);
    if (members[i].membershipLevel > 1) {
      count++;
      result.push(member[i]);
    }
  }
  console.log(result);
  return result;
}

// function displayMembersRandom(members) {}

// gridBtn.addEventListener("click", () => {
//   cards.classList.add("grid");
//   cards.classList.remove("list");
// });

// listBtn.addEventListener("click", () => {
//   cards.classList.add("list");
//   cards.classList.remove("grid");
// });

// getMembers();
