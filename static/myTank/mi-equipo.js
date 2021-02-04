"use strict";

async function main(tank) {
  let detected = false;
  let detectedAngle = 0;

  async function changeCourse(tank, angle) {
    await tank.drive(angle, 49);
  }

  async function avoidCollision(tank, x, y) {
    if (x <= 400 || x >= 800) {
      if (x >= 800) {
        switch (true) {
          case y >= 700:
            await changeCourse(tank, 225);
            break;
          case y < 300:
            await changeCourse(tank, 135);
            break;
          default:
            await changeCourse(tank, 180);
            break;
        }
      } else {
        switch (true) {
          case y >= 600:
            await changeCourse(tank, 315);
            break;
          case y < 400:
            await changeCourse(tank, 45);
            break;
          default:
            await changeCourse(tank, 0);
            break;
        }
      }
    } else if (y <= 400 || y >= 600) {
      if (y >= 600) {
        switch (true) {
          case x >= 800:
            await changeCourse(tank, 225);
            break;
          case x < 400:
            await changeCourse(tank, 315);
            break;
          default:
            await changeCourse(tank, 270);
            break;
        }
      } else {
        switch (true) {
          case x >= 800:
            await changeCourse(tank, 135);
            break;
          case x < 400:
            await changeCourse(tank, 45);
            break;
          default:
            await changeCourse(tank, 90);
            break;
        }
      }
    }
  }

  async function turnTankAndShot(tank, shot) {
    let smalDistance = 2;
    let longDistance = 8;
    let shotAngle;
    if (shot <= 300) {
      shotAngle = smalDistance;
    } else if (shot > 300) {
      shotAngle = longDistance;
    }
    await tank.drive(detectedAngle, 49);
    await tank.shoot(detectedAngle + shotAngle, shot + 70);
    await tank.shoot(detectedAngle - shotAngle, shot + 70);
    detected = false;
  }

  async function scanerStart(tank) {
    for (let i = detectedAngle; !detected; i = i + 25) {
      let checkPosition;
      let X = await tank.getX();
      let Y = await tank.getY();
      if (X > 1100 || X < 200 || Y > 800 || Y < 200) {
        checkPosition = true;
      } else {
        checkPosition = false;
      }
      if (checkPosition) {
        await avoidCollision(tank, X, Y);
      } else if (!checkPosition) {
        let shot;
        let distance;
        distance = await tank.scan(i, 10);
        if (distance > 0) {
          detected = true;
          if (distance > 0) {
            shot = distance;
            detectedAngle = i;
            if (i > 60) {
              i = i - 50;
            } else {
              i = i - 15;
            }
          }
          await turnTankAndShot(tank, shot);
        }
      }
    }
  }

  // main loop

  while (true) {
    await tank.drive(90, 49);
    while (!detected) {
      await scanerStart(tank);
    }
  }
}
