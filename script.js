// script.js
const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const cardCounter = document.getElementById("card-counter");
const clearAllBtn = document.getElementById("clear-all");
const toggleDarkMode = document.getElementById("toggle-dark-mode");
let editBool = false;
let cardCount = 0;

// Dark mode toggle
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  toggleDarkMode.innerHTML = isDark 
    ? '<i class="fa-solid fa-sun"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem("darkMode", isDark);
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  toggleDarkMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Add question
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

// Close form
closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (editBool) {
    editBool = false;
    submitQuestion();
  }
});

// Submit question
cardButton.addEventListener("click", () => {
  editBool = false;
  const tempQuestion = question.value.trim();
  const tempAnswer = answer.value.trim();
  
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    container.classList.remove("hide");
    errorMessage.classList.add("hide");
    viewlist();
    question.value = "";
    answer.value = "";
    if (!editBool) cardCount++;
    updateCardCounter();
  }
});

// Clear all cards
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all flashcards?")) {
    document.querySelector(".card-list-container").innerHTML = "";
    cardCount = 0;
    updateCardCounter();
  }
});

// Generate card
function viewlist() {
  const listCard = document.querySelector(".card-list-container");
  const div = document.createElement("div");
  div.classList.add("card");
  div.style.animation = "cardAppear 0.5s ease-in";
  let isFavorite = false;

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.innerHTML = `<p class="question-div">${question.value}</p>`;

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.innerHTML = `<p class="answer-div">${answer.value}</p>`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  div.appendChild(cardInner);

  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  
  // Favorite button
  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favorite");
  favoriteButton.innerHTML = `<i class="fa-regular fa-star"></i>`;
  favoriteButton.addEventListener("click", () => {
    isFavorite = !isFavorite;
    div.classList.toggle("favorite-card");
    favoriteButton.innerHTML = isFavorite 
      ? `<i class="fa-solid fa-star"></i>` 
      : `<i class="fa-regular fa-star"></i>`;
  });
  buttonsCon.appendChild(favoriteButton);

  // Edit button
  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
    cardCount--;
    updateCardCounter();
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard.appendChild(div);
  hideQuestion();
}

// Modify elements
const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;
  const parentQuestion = parentDiv.querySelector(".question-div").innerText;

  if (edit) {
    const parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }

  parentDiv.remove();
};

// Update card counter
function updateCardCounter() {
  cardCounter.textContent = `Cards: ${cardCount}`;
}

// Disable buttons
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

// Hide question form
const hideQuestion = () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
};
