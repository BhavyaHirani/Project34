const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, msubmarine, ground, launcher, submarine;
var missiles = [];
var submarines = [];
var score = 0;

var isGameOver = false;

function preload() {
  backgroundImg = loadImage("background.webp");
  msubImage = loadImage("mainSubmarine.png");
  submarineImg = loadImage("otherSubmarine.png") 
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  msubmarine = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, msubmarine);

  launcher = new Launcher(200, 280, 100, 50, angle);

  var submarineFrames = 5
  for (var i = 0; i < submarineFrames.length; i++) {
    var pos = submarineFrames[i].position;
    var img = submarineImg.get(pos.x, pos.y, pos.w, pos.h);
    submarineAnimation.push(img);
  }

  var brokenSubmarineFrames = 2
  for (var i = 0; i < brokenSubmarineFrames.length; i++) {
    var pos = brokenSubmarineFrames[i].position;
    var img = submarineImg.get(pos.x, pos.y, pos.w, pos.h);
    brokenSubmarineAnimation.push(img);
  }

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
 
  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(msubmarine.position.x, msubmarine.position.y);
  rotate(msubmarine.angle);
  imageMode(CENTER);
  image(msubImage, 0, 0, 160, 310);
  pop();

  showSubs();

   for (var i = 0; i < missiles.length; i++) {
    showMissiles(missiles[i], i);
    collisionWithSubs(i);
  }

  launcher.display();
  

  fill("#6d4c41");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}

function collisionWithSubs(index) {
  for (var i = 0; i < submarines.length; i++) {
    if (missiles[index] !== undefined && submarines[i] !== undefined) {
      var collision = Matter.SAT.collides(missiles[index].body, submarines[i].body);

      if (collision.collided) {
        score+=5
        submarines[i].remove(i);
        

        Matter.World.remove(world, missiles[index].body);
        delete missiles[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var missile = new Missile(launcher.x, launcher.y);
    missile.trajectory = [];
    Matter.Body.setAngle(missile.body, launcher.angle);
    missiles.push(missile);
  }
}

function showMissiles(mis, index) {
  if (mis) {
    mis.display();
    mis.animate();
    if (mis.body.position.x >= width || mis.body.position.y >= height - 50) {
      if(!mis.isSink){
        mis.remove(index);
      }
    }
  }
}

function showSubs() {
  if (submarines.length > 0) {
    if (
      submarines.length < 4 &&
      submarines[submarines.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var sub = new Submarine(
        width,
        height - 100,
        170,
        170,
        position
      );

      submarines.push(sub);
    }

    for (var i = 0; i < submarines.length; i++) {
      Matter.Body.setVelocity(submarines[i].body, {
        x: -0.9,
        y: 0
      });

      submarines[i].display();
      submarines[i].animate();
      var collision = Matter.SAT.collides(this.msubmarine, submarines[i].body);
      if (collision.collided && !submarines[i].isBroken) {
        isGameOver = true;
        gameOver();
      }
    }
  } else {
    var sub = new Submarine(width, height - 60, 170, 170, -60);
    submarines.push(sub);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    missiles[missiles.length - 1].shoot();
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}