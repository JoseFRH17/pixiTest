//import * as PIXI from 'pixi.js'

//Create a Pixi Application
let app = new PIXI.Application({
  width: 500,
  height: 500,
  resolution: 1

});
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const images = "images/";
const beheaded = "beheaded.jpg";
const beheadedPath = images + "beheaded.jpg";
//const beheadedPath = "http://localhost:3000/images/beheaded.jpg";

let keyCodes = {}
const keysDiv = document.querySelector("#keys");

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

function keyDown(e) {
  keyCodes[e.keyCode] = true;
}

function keyUp(e) {
  keyCodes[e.keyCode] = false;
}

let player = new PIXI.Sprite.from(beheadedPath);
app.stage.addChild(player);

app.ticker.add(gameLoop);

function gameLoop() {
  //keysDiv.innerHTML = JSON.stringify(keyCodes);

  if(keyCodes["87"]){
    player.y -= 5;
  }
  if(keyCodes["65"]){
    player.x -= 5;
  }
  if(keyCodes["68"]){
    player.x += 5;
  }
  if(keyCodes["83"]){
    player.y += 5;
  }
} 

