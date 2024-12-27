const whitelistInput = document.getElementById("whitelist-input");
const addToWhitelist = document.getElementById("add-to-whitelist");
const whitelist = document.getElementById("whitelist");
let whitelistData = JSON.parse(localStorage.getItem("whitelist")) || [];

// Load whitelist
function loadWhitelist() {
  whitelist.innerHTML = "";
  whitelistData.forEach((site) => {
    const li = document.createElement("li");
    li.textContent = site;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      whitelistData = whitelistData.filter((item) => item !== site);
      localStorage.setItem("whitelist", JSON.stringify(whitelistData));
      loadWhitelist();
    });
    li.appendChild(removeBtn);
    whitelist.appendChild(li);
  });
}

addToWhitelist.addEventListener("click", () => {
  const site = whitelistInput.value.trim();
  if (site && !whitelistData.includes(site)) {
    whitelistData.push(site);
    localStorage.setItem("whitelist", JSON.stringify(whitelistData));
    whitelistInput.value = "";
    loadWhitelist();
  }
});

loadWhitelist();
