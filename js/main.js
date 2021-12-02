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
    savedAnswer.innerText = "Nothing saved!"
  }

  const req = new XMLHttpRequest();
  

  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const res = JSON.parse(req.responseText)
      if (res) {
        if (!res.gender) {
          predictionGender.innerText = "There is no guess for '"+ currentName + "'"
          predictionConfidence.innerText = ""
        } else {
          predictionGender.innerText = "Gender: " +res.gender
          if (res.probability) {
            predictionConfidence.innerText = "Probability: " + res.probability
          }
        }
      } 
    } else if (req.readyState === 4 && !req.status === 200){
      predictionGender.innerText = "Some thing went wrong :( \n Try again please."
      predictionConfidence.innerText = ""
    }
  }
  req.open("GET", baseApi+currentName, true);
  req.send( null);
}

function saveNameGender(event) {
  console.log("saveNameGender called")
  event.preventDefault()
  currentName = nameInput.value
  if (!currentName) {
    return
  }
  submitQuery(event)
  const selectedGender = document.querySelector('input[name="gender"]:checked'); //get radio button data
  if(selectedGender) {
    console.log("storing value in localstorage", currentName, selectedGender.value)
    localStorage.setItem(currentName, selectedGender.value)
    savedAnswer.innerText = selectedGender.value
    
  } else {
    localStorage.setItem(currentName, predictionGender.innerText)
    savedAnswer.innerText = predictionGender.innerText
  }
}

function removeSavedData(event) {
  console.log("removeSavedData called")
  event.preventDefault()
  if (!currentName) {
    return
  }
  console.log("removing Name-Gender from localstorage", currentName)
  localStorage.removeItem(currentName)
  savedAnswer.innerText = "Nothing saved!"
}
