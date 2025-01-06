const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
let editBool = false;

// Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

// Hide Create flashcard Card
closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (editBool) {
    editBool = false;
    submitQuestion();
  }
});

// Submit Question
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
  }
});

// Card Generate with Flip Effect
function viewlist() {
  const listCard = document.getElementsByClassName("card-list-container")[0];
  const div = document.createElement("div");
  div.classList.add("card");

  // Create the inner part of the card to allow flipping
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  // Front side with the question
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.innerHTML = `<p class="question-div">${question.value}</p>`;

  // Back side with the answer
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.innerHTML = `<p class="answer-div">${answer.value}</p>`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  div.appendChild(cardInner);

  // Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard.appendChild(div);
  hideQuestion();
}

// Modify elements (edit or delete)
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

// Disable edit and delete buttons
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

// Hide the question form and show flashcards again
const hideQuestion = () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
};
