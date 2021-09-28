import config from '../config';
import Phaser from 'phaser';
import E2Time from './E2Time'
import Player from './Player'
import Clock from '../ui/Clock'
import Debug from '../ui/Debug'
import TimeColor from '../ui/TimeColor'
import Cell from './Cell'
import world from '../data/world'

const game = () => {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 896,
    height: 504,
    physics: {
      default: 'arcade',
      arcade: {
        debug: config.DEBUG,
        checkCollision: { up: true, down: true, left: true, right: true }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    pixelArt: true
  });

  const e2Time = new E2Time();
  let earth2 = {};
  let cellPos = {
    x: 0,
    y: 0
  }
  let ui = {
    clock: null,
    debug: null
  };
  let posText;
  let loadingNewCell = false;
  let overlapCollider = null;

  function preload() {
    this.load.image('player', 'textures/player.png');
    this.load.image('evergreen', 'textures/evergreen.png');
    this.load.image('rock', 'textures/rock.png');
    this.load.image('wand', 'textures/wand.png');
  }

  function create() {
    // GAME SETUP
    earth2.cell = Cell(this)
    earth2.staticCollisionGroup = this.add.group()
    earth2.interactiveCollisionGroup = this.add.group()
    earth2.overlapGroup = this.add.group()
    earth2.timeColor = TimeColor(this);
    earth2.player = Player(this);

    // UI
    ui.clock = Clock(this, e2Time);
    ui.debug = Debug(this, world[cellPos.x][cellPos.y]);

    // LOAD CELL FROM WORLD DATA
    earth2.cell.load(
      world[cellPos.x][cellPos.y],
      {
        top: world[cellPos.x][cellPos.y + 1],
        right: world[cellPos.x + 1] ? world[cellPos.x + 1][cellPos.y] : null,
        bottom: world[cellPos.x][cellPos.y - 1],
        left: world[cellPos.x - 1] ? world[cellPos.x - 1][cellPos.y] : null
      },
      earth2.staticCollisionGroup,
      earth2.interactiveCollisionGroup,
      earth2.overlapGroup
    )

    // ADD COLLIDERS
    this.physics.add.collider(earth2.player.getSprite(), earth2.staticCollisionGroup);
    this.physics.add.collider(earth2.player.getSprite(), earth2.interactiveCollisionGroup, (player, wand) => {
      wand.destroy();
    });
    overlapCollider = this.physics.add.overlap(earth2.player.getSprite(), earth2.overlapGroup, (player, zone) => {
      loadingNewCell = true;
      cellPos = { x: zone.to.x, y: zone.to.y }

      earth2.cell.load(
        world[cellPos.x][cellPos.y],
        {
          top: world[cellPos.x][cellPos.y + 1],
          right: world[cellPos.x + 1] ? world[cellPos.x + 1][cellPos.y] : null,
          bottom: world[cellPos.x][cellPos.y - 1],
          left: world[cellPos.x - 1] ? world[cellPos.x - 1][cellPos.y] : null
        },
        earth2.staticCollisionGroup,
        earth2.interactiveCollisionGroup,
        earth2.overlapGroup
      );
      player.setPosition(
        zone.to.px ? zone.to.px : player.body.position.x + 16,
        zone.to.py ? zone.to.py : player.body.position.y + 16
      );
    }, () => {
      return !loadingNewCell
    });
  }
  
  function update(time, delta) {
    e2Time.add(delta);

    loadingNewCell = false

    earth2.player.update(delta);
    ui.clock.update(e2Time);
    ui.debug.update(world[cellPos.x][cellPos.y])
    earth2.timeColor.setDayNight(e2Time);
  }
}

export default game;
