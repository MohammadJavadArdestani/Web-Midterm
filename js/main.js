const nameInput = document.getElementById("name-input")
const predictionGender = document.getElementById("prediction-gender")
const predictionConfidence = document.getElementById("prediction-confidence")
const savedAnswer = document.getElementById("saved-answer")

const baseApi = "https://api.genderize.io/?name="

let currentName = "";

// check local storage for saved answer, send get request to genderize and get response and display results 
function submitQuery(event) {
  console.log("submitCustom called")
  event.preventDefault()
  currentName = nameInput.value
  if (!currentName) {
    return
  }

  // check local storage for the name
  const savedGender = localStorage.getItem(currentName)
  if (savedGender) {
    savedAnswer.innerText = savedGender
  } else {
    savedAnswer.innerText = "Nothing saved!"
  }

  // send request, show appropriate response as query result otherwise display errors
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const res = JSON.parse(req.responseText)
      if (res) {
        if (!res.gender) { // if api couldn't find the answer we show below message
          predictionGender.innerText = "There is no guess for '"+ currentName + "'"
          predictionConfidence.innerText = ""
        } else { // if gender detected by api we show the gender and Probability
          predictionGender.innerText = "Gender: " +res.gender
          if (res.probability) {
            predictionConfidence.innerText = "Probability: " + res.probability
          }
        }
      } 
    } else if (req.readyState === 4 && !req.status === 200){  // if we dont get appropriate response we show the error message
      predictionGender.innerText = "Some thing went wrong :( \n Try again please."
      predictionConfidence.innerText = ""
    }
  }
  req.open("GET", baseApi+currentName, true);
  req.send( null);
}

// save gender by inputed data from user or predicted gender by api
function saveNameGender(event) {
  console.log("saveNameGender called")
  event.preventDefault()
  currentName = nameInput.value
  if (!currentName) {
    return
  }
  submitQuery(event)
  const selectedGender = document.querySelector('input[name="gender"]:checked'); //get the gender from radio buttons
  if(selectedGender) { // if user checked the any radio button we save selcted gender
    console.log("storing value in localstorage", currentName, selectedGender.value)
    localStorage.setItem(currentName, selectedGender.value)
    savedAnswer.innerText = selectedGender.value
    
  } else { // if user doesnt checked the any radio button we save predicted gender
    localStorage.setItem(currentName, predictionGender.innerText)
    savedAnswer.innerText = predictionGender.innerText
  }
}

// delet gender of selcted name from local storage
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
