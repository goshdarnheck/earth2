const Cell = (scene) => {
  const mainRect = scene.add.rectangle(400, 300, 600, 400, 0x000000)
  const rightRect = scene.add.rectangle(1050, 300, 600, 400, 0x000000, 0.5)
  const leftRect = scene.add.rectangle(-250, 300, 600, 400, 0x000000, 0.5)
  const topRect = scene.add.rectangle(400, -150, 600, 400, 0x000000, 0.5)
  const botRect = scene.add.rectangle(400, 750, 600, 400, 0x000000, 0.5)

  const load = (cellInfo, sides) => {
    mainRect.setFillStyle(cellInfo.colour, 1);

    if (sides.top) {
      topRect.setFillStyle(sides.top.colour, 0.5);
    } else {
      topRect.setFillStyle(0x000000, 0);
    }

    if (sides.right) {
      rightRect.setFillStyle(sides.right.colour, 0.5);
    } else {
      rightRect.setFillStyle(0x000000, 0);
    }

    if (sides.bottom) {
      botRect.setFillStyle(sides.bottom.colour, 0.5);
    } else {
      botRect.setFillStyle(0x000000, 0);
    }

    if (sides.left) {
      leftRect.setFillStyle(sides.left.colour, 0.5);
    } else {
      leftRect.setFillStyle(0x000000, 0);
    }
  }

  return {
    load: load
  };
};

export default Cell;
