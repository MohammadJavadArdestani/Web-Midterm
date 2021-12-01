const nameInput = document.getElementById("name-input")
const predictionGender = document.getElementById("prediction-gender")
const predictionConfidence = document.getElementById("prediction-confidence")
const savedAnswer = document.getElementById("saved-answer")

let currentName = "";

function submitCustom(event) {
  console.log("submitCustom called")
  event.preventDefault()
  currentName = nameInput.value
  if (!currentName) {
    return
  }

  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if(selectedGender) {
    console.log("storing value in localstorage", currentName, selectedGender.value)
    localStorage.setItem(currentName, selectedGender.value)
  }

  const savedGender = localStorage.getItem(currentName)
  if (savedGender) {
    savedAnswer.innerText = savedGender
  } else {
    savedAnswer.innerText = ""
  }
}

function clearCustom(event) {
  console.log("clearCustom called")
  event.preventDefault()
  if (!currentName) {
    return
  }
  console.log("removing value from localstorage", currentName)
  localStorage.removeItem(currentName)
  savedAnswer.innerText = ""
}
