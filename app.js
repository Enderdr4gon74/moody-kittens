let kittens = []
let currentKitten
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenNumber = Math.floor(Math.random() * 3) + 1;
  let imageType = "happy";
  console.log(kittenNumber)
  let kitten = {
    id: generateId(),
    imgNum: kittenNumber,
    imgType: imageType,
    name: form.name.value,
    mood: "happy",
    affection: 7
  }
  console.log(kitten.imgType)
  let condition = true
  for (let i = 0; i < kittens.length; i++) {
    if (kitten.name == kittens[i].name) {
      condition = false
    }
  }
  if (condition) {
    kittens.push(kitten)
    saveKittens()
  } else {
    console.log("That kitten name is already taken.")
  }
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenList = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittenList) {
    kittens = kittenList
  }
  for (let i = 0; i < kittens.length; i++) {
    console.log(kittens[i].imgNum + ", " + kittens[i].imgType)
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  
  //kittens.forEach(kitten =>
   for (let i = 0; i < kittens.length; i++) {
    let kittenChoice = "cat_" + kittens[i].imgNum + "_" + String(kittens[i].imgType) + ".jpg"
    let kittenChoiceName = "cat_" + kittens[i].imgNum + "_" + String(kittens[i].imgType);
    console.log(kittens[i].id)
    let idNum = i;
    kittensTemplate += `
    <div class="card kitten"> 
      <img src="${kittenChoice}" height="200" alt="${kittenChoiceName}">
      <h3 class="font-spectral">${kittens[i].name}</h3>
      <p>Mood: ${kittens[i].mood}</p>
      <p>Affection: ${kittens[i].affection}</p>
      <p>ID: ${kittens[i].id}</p>
      <div class="d-flex space-between">
        <button onclick="pet(${idNum})">Pet</button>
        <button onclick="catnip(${idNum})">Catnip</button>
      </div>
    </div>
    `
  }
  //)
  console.log(kittensTemplate)
  kittenListElement.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(kittenId) {
  let index = -1
  for (let i = 0; i < kittens.length; i++) {
    if (kittenId == kittens[i].id) {
      index = i
    }
    console.log(i + ", " + kittenId + ", " + kittens[i].id)
  }
  console.log(index)
  return kittens[index]
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(currentKittenId) {
  console.log(currentKittenId)
  currentKittenId = kittens[currentKittenId].id
  console.log(currentKittenId)
  currentKitten = findKittenById(currentKittenId)
  let ranNum = Math.random()
  console.log(ranNum)
  if (ranNum > 0.5) {
    if (currentKitten.affection >= 1 && currentKitten.affection < 9) {
      currentKitten.affection++
    }
  } else {
    if (currentKitten.affection > 1 && currentKitten.affection <= 9) {
      currentKitten.affection--
    }
  }
  setKittenMood(currentKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(currentKittenId) {
  console.log(currentKittenId)
  currentKittenId = kittens[currentKittenId].id
  console.log(currentKittenId)
  currentKitten = findKittenById(currentKittenId)
  currentKitten.mood = "neutral"
  currentKitten.imgType = "neutral"
  drawKittens()
  currentKitten.affection = 5
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (currentKitten.affection >= 1 && currentKitten.affection <= 3) {
    currentKitten.mood = "angry"
  } else if (currentKitten.affection >= 4 && currentKitten.affection <= 6) {
    currentKitten.mood = "neutral"
  } else if (currentKitten.affection >= 7 && currentKitten.affection <= 9) {
    currentKitten.mood = "happy"
  }
  drawKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0, kittens.length)
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens").classList.remove("hidden")
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
drawKittens()
