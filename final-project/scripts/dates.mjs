export function date() {
  const lastModified = document.lastModified;
  document.getElementById("lastModified").textContent =
    "Last Modified " + lastModified;
  const yearSpan = document.getElementById("currentyear");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}
