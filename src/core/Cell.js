import Tree from './Tree'
import Teleport from './Teleport'

const Cell = (scene) => {
  const mainRect = scene.add.rectangle(400, 300, 600, 400, 0x000000)
  const rightRect = scene.add.rectangle(1050, 300, 600, 400, 0x000000, 0.5)
  const leftRect = scene.add.rectangle(-250, 300, 600, 400, 0x000000, 0.5)
  const topRect = scene.add.rectangle(400, -150, 600, 400, 0x000000, 0.5)
  const botRect = scene.add.rectangle(400, 750, 600, 400, 0x000000, 0.5)
  const objects = []

  const load = (cellInfo, sides, group, overlapGroup) => {
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

    overlapGroup.clear(true, true);
    
    objects.forEach(obj => {
      obj.destroy()
    })

    if (cellInfo.objects) {
      cellInfo.objects.forEach(obj => {
        let object = null

        if (obj.type === 'Tree') {
          object = Tree(scene, obj)
          group.add(object)
        }
        
        if (obj.type === 'Teleport') {
          object = Teleport(scene, obj)
          overlapGroup.add(object)
        }

        objects.push(object);
      });
    }
  }

  return {
    load: load,
    objects: objects
  };
};

export default Cell;
