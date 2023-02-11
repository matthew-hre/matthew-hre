import React from "react";
import Sketch from "react-p5";

let plates = [1, 1, 1, 1, 1];

let clickCooldown = -1;

function CoinProblemSketch() {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 300).parent(canvasParentRef);
    p5.stroke(255);
    p5.fill(255);
  };

  const draw = (p5) => {
    let fontSize = 24;
    p5.background("#131313");
    p5.textSize(fontSize);
    p5.textAlign(p5.LEFT);
    p5.text("Left-click to promote", 0, 18);
    p5.text("Right-click to swap", 0, 50);
    for (let i = 0; i < plates.length; i++) {
      let collisionAreaX1 = 0 + i * 100 - 10;
      let collisionAreaX2 = 50 + i * 100 + 10;
      let collisionAreaY1 = 100 - 10;
      let collisionAreaY2 = 150 + 10;

      let plate = plates[i].toString();

      fontSize = 24 - plate.length;

      if (
        p5.mouseX > collisionAreaX1 &&
        p5.mouseX < collisionAreaX2 &&
        p5.mouseY > collisionAreaY1 &&
        p5.mouseY < collisionAreaY2
      ) {
        p5.textSize(fontSize * 1.2);

        // mouse pressed
        if (p5.mouseIsPressed) {
          if (clickCooldown !== -1) {
            clickCooldown--;
          } else if (p5.mouseButton === p5.LEFT) {
            if (plates[i] === 0) {
            } else if (i + 1 < plates.length) {
              plates[i] -= 1;
              plates[i + 1] += 2;
            }
            clickCooldown = 7;
          } else if (p5.mouseButton === p5.RIGHT) {
            if (plates[i] === 0) {
            } else if (i + 2 < plates.length) {
              let temp = plates[i + 1];
              plates[i + 1] = plates[i + 2];
              plates[i + 2] = temp;
              plates[i] -= 1;
            }
            clickCooldown = 7;
          }
        }
      } else {
        p5.textSize(fontSize);
      }
      p5.textAlign(p5.CENTER);
      p5.text(plate, 25 + i * 100, 140);
      p5.line(0 + i * 100, 150, 50 + i * 100, 150);
    }
  };

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default CoinProblemSketch;
