//import * as PIXI from 'pixi.js'
const CANVAS_SIZE = 1000;
const PLAYER_SPEED = 3;
const MIN = 32;
const EDGE = 35;
//Create a Pixi Application
let app = new PIXI.Application({
  width: CANVAS_SIZE,
  height: CANVAS_SIZE,
  resolution: 1
});

document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";


const images = "images/";
const beheaded = "beheaded.jpg";
const eatableItemImage = "eatableItem.png";
const beheadedPath = images + beheaded;
const eatableItemPath = images + eatableItemImage;
const scoreDiv = document.querySelector("#score");
let keyCodes = {}
let score = 0;


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
player.x = CANVAS_SIZE/2;
player.y = CANVAS_SIZE/2;

app.ticker.add(gameLoop);

let eatableItem = new PIXI.Sprite.from(eatableItemPath);
app.stage.addChild(eatableItem);
eatableItem.x = 50;
eatableItem.y = 200;

function gameLoop() {
  //keysDiv.innerHTML = JSON.stringify(keyCodes);

  if(keyCodes["87"]){
    player.y -= PLAYER_SPEED;
  }
  if(keyCodes["65"]){
    player.x -= PLAYER_SPEED;
  }
  if(keyCodes["68"]){
    player.x += PLAYER_SPEED;
  }
  if(keyCodes["83"]){
    player.y += PLAYER_SPEED;
  }
  scoreDiv.innerHTML ="<H1> Actual Score: " +  score + "</H1>"; 
  isPlayerOutOfCanvas();
  generateEatableItem();
} 

function isPlayerOutOfCanvas() {
  if(player.y > CANVAS_SIZE - MIN) {
    player.y = EDGE;
  }
  if(player.y < MIN) {
    player.y = CANVAS_SIZE - EDGE;
  }
  if(player.x > CANVAS_SIZE - MIN ) {
    player.x = EDGE;
  }
  if(player.x < MIN) {
    player.x = CANVAS_SIZE - EDGE;
  }
}

function generateEatableItem(eaten) {
  if(isPlayerEatingTheItem()) {
    app.stage.addChild(eatableItem);
    eatableItem.x = Math.random() * (CANVAS_SIZE - EDGE) + EDGE;
    eatableItem.y = Math.random() * (CANVAS_SIZE - EDGE) + EDGE;
    score+=1;
  }
}

function isPlayerEatingTheItem() {
  return ((Math.abs((player.x - eatableItem.x)) < MIN) && (Math.abs((player.y - eatableItem.y)) < MIN));
}

