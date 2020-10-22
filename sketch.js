

var dog;
var happyDog;
var database;
var foods;
var foodStok;
var dogImage;
var dogImage2;
var fedTime, lastFed;
var foodObj ;
var foodStock
var currentTime;
var changinggameState;
var readinggameState;
var bed,garden,washroom; 
function preload()
{
  dogImage = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
  bed=loadImage("image/BedRoom.png");
  garden=loadImage("image/Garden.png");
  washroom=loadImage("image/WashRoom.png");
}

function setup() {
  database= firebase.database();
  createCanvas(800, 600);
  
  dog = createSprite(600,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2;

var foodStok=database.ref('food');
  foodStok.on("value",readStok);

var feed = createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

var addFood = createButton("add food ");
addFood.position(800,95);
addFood.mousePressed(addFoods);

readinggameState=database.ref('gameState');
readinggameState.on("value",function(data){
  gameState=data.val();
});
 
}


function draw() {  
  background(46,139,87);
 
 
 

  drawSprites();
  
  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFeed=data.val();
  })
  
  textSize(20)
  fill("white");
  
  currentTime=hour();
if(currentTime==(lastFed+1)){
  update("playing");
  foodObj.garden();
}else if(currentTime=lastFed+2){
  update("sleeping");
  foodObj.bed();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("bathing");
  foodObj.washroom();
}else{
  update("hungry");
  foodObj.display();
}






 if(lastFed>=12){
   text("lastFeed :  "+lastFed%12+"PM",350,30)
}else if(lastFed==0){
  text("lastfeed : 12 AM",350,30)
}else{
  text("lastFeed : " + lastFed+"AM",350,30)
}

if(gameState!="hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(dogImage);
}
 
}

function readStok(data){
foods=data.val();
}

function writeStok(x){
  if(x<=0){
 x=0;
  }
  else{
 x=x-1;
  }
  database.ref('/').update({
    food:x
  })
  }


  function feedDog(){
    dog.addImage(dogImage2);

    foodObj.updateFoodStock(foodObj. getFoodStock()-1);
    database.ref('/').update({
      food:foodObj. getFoodStock(),
      feedTime:hour()
    });
  }

  function addFoods(){
foods++
database.ref('/').update({
  food:foods
})
  }

  function update(state){
    database.ref('/').update({
      gameState:state
  })
}
