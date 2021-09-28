import { TILE_SIZE } from '../config';
import Tree from '../objects/static/Tree'
import Rock from '../objects/static/Rock'
import Wand from '../objects/pickups/Wand'
import Teleport from './Teleport'

const Cell = (scene) => {
  const mainRect = scene.add.rectangle(TILE_SIZE * 2, 60, TILE_SIZE * 24, TILE_SIZE * 12, 0x000000).setOrigin(0, 0);

  const topRect = scene.add.rectangle(
    TILE_SIZE * 2,
    -Math.abs(TILE_SIZE * 12) + 60,
    TILE_SIZE * 24,
    TILE_SIZE * 12,
    0x000000,
    0.5
  ).setOrigin(0, 0);
  const rightRect = scene.add.rectangle(
    TILE_SIZE * 26,
    60,
    TILE_SIZE * 24,
    TILE_SIZE * 12,
    0x000000,
    0.
  ).setOrigin(0, 0);
  const botRect = scene.add.rectangle(
    TILE_SIZE * 2,
    TILE_SIZE * 12 + 60,
    TILE_SIZE * 24,
    TILE_SIZE * 12,
    0x000000,
    0.5
  ).setOrigin(0, 0);
  const leftRect = scene.add.rectangle(
    -Math.abs(TILE_SIZE * 22),
    60,
    TILE_SIZE * 24,
    TILE_SIZE * 12,
    0x000000,
    0.5
  ).setOrigin(0, 0);

  const objects = []

  const load = (cellInfo, sides, staticCollisionGroup, interactiveCollisionGroup, overlapGroup) => {
    mainRect.setFillStyle(cellInfo.colour, 1);

    if (sides.top) {
      topRect.setFillStyle(sides.top.colour, 0.5);
    } else {
      topRect.setFillStyle(0x000000, 0);
    }

    if (sides.right) {
      rightRect.setFillStyle(sides.right.colour, 1);
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
          staticCollisionGroup.add(object)
        }

        if (obj.type === 'Rock') {
          object = Rock(scene, obj)
          staticCollisionGroup.add(object)
        }

        if (obj.type === 'Wand') {
          object = Wand(scene, obj)
          interactiveCollisionGroup.add(object)
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
