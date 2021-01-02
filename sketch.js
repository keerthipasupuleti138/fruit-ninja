var sword,swordimage,fruit1,fruit2,fruit3,fruit4,fruitgroup
var f,m,mi,mg,gameover
var score=0
gamestate="p"

var knifeSwooshSound,gameoverSound


function preload(){
  
  swordimage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  mi=loadAnimation("alien1.png","alien2.png")
  gameover=loadImage("gameover.png")
}
function setup (){
  createCanvas(400,400)
  sword=createSprite(40,200,20,20);
   sword.addImage(swordimage);
   sword.scale=0.7
  
  fruitgroup = new Group();
  mg=new Group();
  
  knifeSwoohSound = loadSound("knifeSwooshSound.mp3")
  gameoverSound= loadSound("gameover.mp3")
}
function draw(){
  background("lightblue")
  text("score:"+score,300,100)
    if(gamestate === "p"){
      
    
  sword.y=World.mouseY;
    sword.x=World.mouseX;
      if(sword.isTouching(fruitgroup)){
        fruitgroup.destroyEach()
        knifeSwoohSound.play()
        score=score+2
      }
      if(sword.isTouching(mg)){
        gameoverSound.play()
        gamestate="end"
      }
  Fruit()
  monster()
    }
  if(gamestate==="end"){
    fruitgroup.destroyEach()
    mg.destroyEach()
    sword.x=200
    sword.y=200
    sword.addImage(gameover)
  }
  drawSprites();
  
}
function Fruit(){
  if(frameCount % 80 === 0){
    position = Math.round(random(1,2))
  f=createSprite(600,300,10,10)
  f.y=random(100,400)
  f.velocityX=-6
    var b=Math.round(random(1,2))
    if(b===1){
      f.x=0
      f.velocityX=(6+2*score/20)
    }
    else if(b===2){
      f.x=600
      f.velcityX=-(6+2*score/20)
    }
    var a=Math.round(random(1,4))
    switch(a){
      case 1:f.addImage(fruit1)
        break ; 
        case 2:f.addImage(fruit2)
        break ; 
        case 3:f.addImage(fruit3)
        break ; 
        case 4:f.addImage(fruit4)
        break ; 
    }
    f.lifeTime=300
    fruitgroup.add(f)
    f.scale=0.2
}
}
function monster(){
  if(frameCount % 200 === 0){
    m=createSprite(600,300,10,10)
    var b=Math.round(random(1,2))
    if(b===1){
      m.x=0
      m.velocityX=(6+2*score/20)
    }
   else if(b===2){
      m.x=600
     m.velocityX=-(6+2*score/20)
    }
    m.y=random(200,400)
    m.velocityX=-(8+(score/10));
    m.addAnimation("moving",mi)
    m.lifeTime=300
    mg.add(m)
  }
}