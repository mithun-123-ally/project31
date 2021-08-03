const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var leftside;
var rightside;
var leftside_con;
var rightside_con;
var rope1;
var rope2;
var base;
var balls = [];


function preload(){
  backgroundImage = loadImage("./assets/background.png")
  zombie1= loadImage("./assets/zombie.png");
  zombie2= loadImage("./assets/zombie.png");
  zombie3= loadImage("./assets/zombie.png");
  zombie4= loadImage("./assets/zombie.png");
  sadzombie= loadImage("./assets/sad_zombie.png");
 
}

function setup() {
  
  
  
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(0, height - 10, width * 2, 20); 
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
   rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);
    bridge = new Bridge(30, { x: 50, y: height / 2 - 140 }); 
    jointPoint = new Base(width - 250, height / 2 - 100, 40, 20); 
    Matter.Composite.add(bridge.body, jointPoint);
     jointLink = new Link(bridge, jointPoint);
      
     for (var i = 0; i <= 8; i++) { 
     var x = random(width / 2 - 200, width / 2 + 300);
     var y = random(-100, 100); 
     var stone = new Stone(x, y, 80, 80);
     stones.push(stone);
     }
 
  


  zombie = createSprite(width/2,height - 110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10


  breakButton = createButton('');
  breakButton.position(width - 200,height/2-50);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPressed);
  
  
 

}
function draw() {
  background(backgroundImage);
  Engine.update(engine);
  bridge.show()

  for (var stone of stones){ 
     stone.show();
     var pos = stone.body.position;
     var distance = dist (zombie.position.x,zombie.postion.y,pos.x,pos.y);
     if(distance <= 50){
    zombie.velocityX=0;
    Matter.Body.setVelocity(stone.body,{ x:10,y:-10});
    zombie.changeImage("sad");
    collided =true;

      }
     } 
 
     if(collide(zombie,stone)==true){
      zombie.changeImage("sad")
    }

     if (zombie.position.x >= width - 300) { 
    zombie.velocityX = -10; 
    zombie.changeAnimation("righttoleft");
   } 
   if (zombie.position.x <= 300) {
      zombie.velocityX = 10; 
      zombie.changeAnimation("lefttoright");
     }
   
   dist()
  drawSprites();
}

function handleButtonPressed(){
jointLink.detach()
setTimeout(() => {
  bridge.break();
},1500 );
}