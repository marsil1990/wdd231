// const cards = document.getElementById("sections");
// const gridBtn = document.getElementById("grid");
const cards = document.getElementById("specific-business");

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json"); // Wait for the fetch to complete
    const data = await response.json(); // Wait for the response to be converted to JSON
    membersRandom(data);
  } catch (error) {
    console.error("Error fetching data:", error); // Handle any errors
  }
};

const displayMembersRandom = (members) => {
  // card build code goes here
  members.forEach((member) => {
    // card build code goes here
    const card = document.createElement("section");
    const divInf = document.createElement("div");
    const address = document.createElement("p");
    const web = document.createElement("a");
    const phone = document.createElement("p");
    const name = document.createElement("h2");
    const logo = document.createElement("img");
    const memberLevel = document.createElement("p");
    memberLevel.innerHTML = `<span>Memberschip Level:</span> ${
      member.membershipLevel == 3 ? "Gold" : "Silver"
    }`;
    name.classList.add("name");
    name.innerHTML = `${member.name}`;
    phone.innerHTML = `<span>Phone:</span> ${member.phone}`;
    web.innerHTML = `<span>Web: </span>${member.website}`;
    address.innerHTML = `<span>Adress:</span> ${member.address}`;
    address.classList.add("adress");
    phone.classList.add("phone");
    web.classList.add("web");
    memberLevel.classList.add("level");
    logo.setAttribute("src", `${member.logo}`);
    logo.setAttribute("alt", `${member.name} `);
    web.setAttribute("href", `${member.website}`);
    web.setAttribute("target", "_blank");
    logo.setAttribute("width", "60");
    logo.setAttribute("height", "60");
    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(divInf);
    divInf.appendChild(phone);
    divInf.appendChild(address);
    divInf.appendChild(web);
    divInf.appendChild(memberLevel);

    cards.appendChild(card);
    // cards.classList.add("grid");
  });
};

function randomItem(members) {
  if (members.length == 0) return undefined; // o lanza un error  0 1 2 3 4 6
  let member = [];
  let count = 0;
  let result = [];
  for (let i = 0; i < members.length; i++) member.push(i);
  let i;
  while (count < 3 && member.length > 0) {
    i = Math.floor(Math.random() * member.length);
    if (members[member[i]].membershipLevel > 1) {
      count++;
      result.push(members[member[i]]);
    }
    member.splice(i, 1);
  }
  return result;
}

function membersRandom(members) {
  let electedMembers = randomItem(members);
  displayMembersRandom(electedMembers);
}

getMembers();
