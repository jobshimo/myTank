"use strict";

async function main(tank) {
  let detectedAngle = 0;
  let defaultSpeed = 49;

  async function getAngle(
    xOrYPosition,
    limitOne,
    limitTwo,
    angleOne,
    angleTwo,
    angleThree
  ) {
    switch (true) {
      case xOrYPosition >= limitOne:
        await tank.drive(angleOne, defaultSpeed);
        break;
      case xOrYPosition < limitTwo:
        await tank.drive(angleTwo, defaultSpeed);
        break;
      default:
        await tank.drive(angleThree, defaultSpeed);
        break;
    }
  }

  async function avoidCollision(x, y) {
    switch (true) {
      case x >= 940:
        await getAngle(y, 700, 300, 225, 135, 180);
        break;
      case x <= 400:
        await getAngle(y, 700, 300, 315, 45, 0);
        break;
      case y >= 700:
        await getAngle(x, 940, 400, 225, 315, 270);
        break;
      case y <= 300:
        await getAngle(x, 940, 400, 135, 45, 90);
        break;
    }
  }

  async function start() {
    let checkPosition;
    let distance;
    let shotAngle;
    let X;
    let Y;
    for (let i = detectedAngle; true; i = i + 25) {
      X = await tank.getX();
      Y = await tank.getY();
      X > 1100 || X < 200 || Y > 800 || Y < 200
        ? (checkPosition = true)
        : (checkPosition = false);
      if (checkPosition) {
        await avoidCollision(X, Y);
      } else {
        distance = await tank.scan(i, 10);
        if (distance > 0) {
          detectedAngle = i;
          i > 60 ? (i -= 50) : (i -= 15);
          distance <= 300 ? (shotAngle = 2) : (shotAngle = 8);
          await tank.drive(detectedAngle, defaultSpeed);
          await tank.shoot(detectedAngle + shotAngle, distance + 70);
          await tank.shoot(detectedAngle - shotAngle, distance + 70);
        }
      }
    }
  }

  // main loop

  while (true) {
    await tank.drive(90, defaultSpeed);
    await start();
  }
}
