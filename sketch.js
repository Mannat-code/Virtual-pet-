//Create variables here
var database;
var dog,dogImg,happy,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;

var value;
var milkimg,milkbottle;

function preload()
{
  dogImg= loadImage("dogImg.png");
  happy = loadImage("dogImg1.png");
  milkimg = loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food();


  dog = createSprite(450,300);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  feed = createButton("Feed your dog");
  feed.position(650,200);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(770,200);
  addFood.mousePressed(addFoods);
  


  milkbottle = createSprite(370,320)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1
}


function draw() {  
  background("lightBlue");
  drawSprites();

  console.log(value)
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }
   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(dogImg);
  }
  else{
    dog.addImage(happy);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(dogImg);
    }
    else
    milkbottle.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}
