class Submarine {
  constructor(x, y, width, height, submarinePos) {
   
    this.speed = 0.05;
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.image = loadImage("otherSubmarine.png")
    this.animation = [this.image]

    this.submarinePosition = submarinePos;
    this.isBroken = false;

    World.add(world, this.body);
  }
  animate() {
    this.speed += 0.05;
  }

  remove(index) {
    this
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    this.isBroken = true;
    setTimeout(() => {
      Matter.World.remove(world, submarines[index].body);
      submarines.splice(index, 1);
    }, 0);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.submarinePosition, this.width, this.height);
    noTint();
    pop();
  }
}
