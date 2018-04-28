document.querySelector("#player-num-form").addEventListener("submit", saveNumOfPlayers)

function saveNumOfPlayers(e){
  e.preventDefault()
  document.querySelector("main").innerHTML = ""
  let numOfPlayers = e.target.childNodes[3].value
  for(var i = 0; i < numOfPlayers; i++){
    let playerCard = document.createElement("div")
    playerCard.setAttribute("id", i + 1)
    let player = document.createElement("h1")
    player.innerText = `Player ${i + 1}`
    playerCard.appendChild(player)
    createFrameCards(playerCard)
    document.querySelector("main").appendChild(playerCard)
  }
}

function createFrameCards(div){
  for(var j = 0; j < 10; j++){
    let frameCard = document.createElement("div")
    frameCard.setAttribute("class", `${j +1} frame-card`)
    let frameLabel = document.createElement("h2")
    frameLabel.innerText = `Frame ${j + 1}`
    frameCard.appendChild(frameLabel)
    div.appendChild(frameCard)
  }
}