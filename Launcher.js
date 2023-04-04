class Launcher {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.launcher_image = loadImage("Launcher.png");
    this.Launcher_base = loadImage("launcherbase.png");
  }
  display() {
    if (keyIsDown(RIGHT_ARROW) && this.angle<70  ) {
      this.angle += 1;
    }

    if (keyIsDown(LEFT_ARROW) && this.angle>-30 ) {
      this.angle -= 1;
    }


    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.launcher_image, 0, 0, this.width, this.height);
    pop();
    image(this.Launcher_base, 70, 175, 200, 200);
    noFill();
  }
}
