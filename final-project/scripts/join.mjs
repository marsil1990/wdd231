export function join() {
  const tsField = document.getElementById("timestamp");
  if (tsField) {
    tsField.value = new Date().toISOString();
  }
  const outFname = document.getElementById("out-firstName");
  const outLname = document.getElementById("out-lastName");
  const outEmail = document.getElementById("out-email");
  const outTime = document.getElementById("out-timestamp");

  const params = new URLSearchParams(window.location.search);
  if (outFname) outFname.textContent = params.get("firstName") || "";
  if (outLname) outLname.textContent = params.get("lastName") || "";
  if (outEmail) outEmail.textContent = params.get("email") || "";

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
}
