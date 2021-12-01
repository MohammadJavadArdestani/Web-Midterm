const nameInput = document.getElementById("name-input")
const predictionGender = document.getElementById("prediction-gender")
const predictionConfidence = document.getElementById("prediction-confidence")
const savedAnswer = document.getElementById("saved-answer")

let currentName = "";

function submitCustom(event) {
  event.preventDefault()
  currentName = nameInput.value
  const selectedGender = document.querySelector('input[name="gender"]:checked').value;
  console.log("submitCustom called")
}

function clearCustom(event) {
  event.preventDefault()
  console.log("clearCustom called")
}
