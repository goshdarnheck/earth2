import { TILE_SIZE } from '../config';
import Tree from '../objects/static/Tree'
import Rock from '../objects/static/Rock'
import Wand from '../objects/pickups/Wand'
import Rat from '../objects/baddies/Rat'
import Mouse from '../objects/baddies/Mouse'
import Potion from '../objects/pickups/Potion'
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
    0.5
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

  const load = (
    cellPos,
    world,
    staticCollisionGroup,
    interactiveCollisionGroup,
    overlapGroup,
    detectGroup
  ) => {
    const cellInfo = world[cellPos.x][cellPos.y];
    const sides = {
      top: world[cellPos.x][cellPos.y + 1],
      right: world[cellPos.x + 1] ? world[cellPos.x + 1][cellPos.y] : null,
      bottom: world[cellPos.x][cellPos.y - 1],
      left: world[cellPos.x - 1] ? world[cellPos.x - 1][cellPos.y] : null
    }
    
    mainRect.setFillStyle(world[cellPos.x][cellPos.y].colour, 1);

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

    // overlapGroup.clear(true, true);
    
    objects.forEach(obj => {
      console.log(obj)
      if (obj.type === 'enemy') {
        obj.kill();
      } else {
        obj.destroy()
      }
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

        if (obj.type === 'Potion') {
          object = Potion(scene, obj)
          interactiveCollisionGroup.add(object)
        }

        if (obj.type === 'Rat') {
          object = Rat(scene, obj, detectGroup)
          interactiveCollisionGroup.add(object)
        }

        if (obj.type === 'Mouse') {
          object = Mouse(scene, obj, detectGroup)
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
