const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options");

let countries = [
  "Afghanistan",
  "Algeria",
  "Argentina" /* ... rest of the countries ... */,
];

function addCountry(selectedCountry) {
  options.innerHTML = "";
  countries.forEach((country) => {
    let isSelected = country == selectedCountry ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}
addCountry();

function updateName(selectedLi) {
  searchInp.value = "";
  addCountry(selectedLi.innerText);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;

  // Get the index of the selected country in the array
  const selectedIndex = countries.indexOf(selectedLi.innerText);

  // Clear existing buttons before creating new ones
  clearButtons();

  // Create buttons based on the index (you can replace this logic with your own)
  createButtons(selectedIndex + 1);
}

function createButtons(numButtons) {
  // Replace this with your desired button creation logic
  for (let i = 0; i < numButtons; i++) {
    let button = document.createElement("button");
    button.textContent = `Button ${i + 1}`;
    document.body.appendChild(button);
  }
}

function clearButtons() {
  // Remove all existing buttons
  document.querySelectorAll("button").forEach((button) => {
    button.remove();
  });
}

searchInp.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = countries
    .filter((data) => {
      return data.toLowerCase().startsWith(searchWord);
    })
    .map((data) => {
      let isSelected =
        data == selectBtn.firstElementChild.innerText ? "selected" : "";
      return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    })
    .join("");
  options.innerHTML = arr
    ? arr
    : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
