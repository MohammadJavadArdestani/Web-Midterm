const nameInput = document.getElementById("name-input")
const predictionGender = document.getElementById("prediction-gender")
const predictionConfidence = document.getElementById("prediction-confidence")
const savedAnswer = document.getElementById("saved-answer")

const baseApi = "https://api.genderize.io/?name="

let currentName = "";

function submitQuery(event) {
  console.log("submitCustom called")
  event.preventDefault()
  currentName = nameInput.value
  if (!currentName) {
    return
  }

  const savedGender = localStorage.getItem(currentName)
  if (savedGender) {
    savedAnswer.innerText = savedGender
  } else {
    savedAnswer.innerText = ""
  }

  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const res = JSON.parse(req.responseText)
      if (res) {
        if (res.gender) {
          predictionGender.innerText = res.gender
        }
        if (res.probability) {
          predictionConfidence.innerText = res.probability
        }
      }
    }
  }
  req.open("GET", baseApi+currentName, true);
  req.send( null);
}

function saveCustom(event) {
  console.log("saveCustom called")
  event.preventDefault()
  currentName = nameInput.value
  if (!currentName) {
    return
  }

  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if(selectedGender) {
    console.log("storing value in localstorage", currentName, selectedGender.value)
    localStorage.setItem(currentName, selectedGender.value)
    savedAnswer.innerText = selectedGender.value
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
