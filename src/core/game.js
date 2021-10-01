import config from '../config';
import Phaser from 'phaser';
import E2Time from './E2Time'
import Player from './Player'
import Clock from '../ui/Clock'
import Debug from '../ui/Debug'
import TimeColor from '../ui/TimeColor'
import Health from '../ui/Health'
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
  let state = {
    cellPos: {
      x: 0,
      y: 0
    }
  }
  let ui = {
    clock: null,
    debug: null,
    health: null
  };
  let loadingNewCell = false;

  function preload() {
    this.load.image('player', 'textures/player.png');
    this.load.image('evergreen', 'textures/evergreen.png');
    this.load.image('rock', 'textures/rock.png');
    this.load.image('wand', 'textures/wand.png');
    this.load.image('rat', 'textures/rat.png');
    this.load.image('potion', 'textures/potion.png');
  }

  function create() {
    // GAME SETUP
    earth2.cell = Cell(this);
    earth2.staticCollisionGroup = this.add.group();
    earth2.interactiveCollisionGroup = this.add.group();
    earth2.overlapGroup = this.add.group();
    earth2.detectGroup = this.add.group();

    earth2.player = Player(this);

    // UI
    ui.clock = Clock(this, e2Time);
    ui.debug = Debug(this, world[state.cellPos.x][state.cellPos.y]);
    ui.health = Health(this, earth2.player.getHealth());
    ui.timeColor = TimeColor(this);

    // LOAD CELL FROM WORLD DATA
    earth2.cell.load(
      world[state.cellPos.x][state.cellPos.y],
      {
        top: world[state.cellPos.x][state.cellPos.y + 1],
        right: world[state.cellPos.x + 1] ? world[state.cellPos.x + 1][state.cellPos.y] : null,
        bottom: world[state.cellPos.x][state.cellPos.y - 1],
        left: world[state.cellPos.x - 1] ? world[state.cellPos.x - 1][state.cellPos.y] : null
      },
      earth2.staticCollisionGroup,
      earth2.interactiveCollisionGroup,
      earth2.overlapGroup,
      earth2.detectGroup
    )

    // ADD COLLIDERS
    this.physics.add.collider(earth2.player, earth2.staticCollisionGroup);
    this.physics.add.overlap(earth2.player.defend, earth2.interactiveCollisionGroup, (defend, other) => {
      if (earth2.player.getDefending()) {
        // console.log('defense hit!', other);
        other.destroy();
      }
    });
    this.physics.add.collider(earth2.player, earth2.interactiveCollisionGroup, (player, other) => {
      player.setDefaultVelocity(0, 0);
      // TODO: this could be changed to move at a more "realistic" angle
      if (player.x < other.x) {
        player.setDefaultVelocityX(-100)
      }
      if (player.y > other.y) {
        player.setDefaultVelocityY(100)
      }
      if (player.x > other.x) {
        player.setDefaultVelocityX(100)
      }
      if (player.y < other.y) {
        player.setDefaultVelocityY(-100)
      }
      //

      if (other.isPickup) {
        other.destroy();
        player.addItem(other.pickupItem)
      }
      
      if (other.collisionDamage) {
        player.collideWith(other);
      }
    });
    this.physics.add.overlap(earth2.player, earth2.overlapGroup, (player, zone) => {
      loadingNewCell = true;
      state.cellPos = { x: zone.to.x, y: zone.to.y };

      earth2.cell.load(
        world[state.cellPos.x][state.cellPos.y],
        {
          top: world[state.cellPos.x][state.cellPos.y + 1],
          right: world[state.cellPos.x + 1] ? world[state.cellPos.x + 1][state.cellPos.y] : null,
          bottom: world[state.cellPos.x][state.cellPos.y - 1],
          left: world[state.cellPos.x - 1] ? world[state.cellPos.x - 1][state.cellPos.y] : null
        },
        earth2.staticCollisionGroup,
        earth2.interactiveCollisionGroup,
        earth2.overlapGroup,
        earth2.detectGroup
      );
      player.setPosition(
        zone.to.px ? zone.to.px : player.body.position.x + 16,
        zone.to.py ? zone.to.py : player.body.position.y + 16
      );
    }, () => {
      return !loadingNewCell
    });

    earth2.interactiveCollisionGroup.children.entries.forEach(thing => console.log(thing))
  }
  
  function update(time, delta) {
    e2Time.add(delta);

    loadingNewCell = false

    earth2.player.update(delta);
    earth2.interactiveCollisionGroup.children.entries.forEach(thing => {
      if (thing.update) thing.update(delta)
    })
    
    ui.clock.update(e2Time);
    ui.health.update(earth2.player.getHealth())
    ui.debug.update(world[state.cellPos.x][state.cellPos.y])
    ui.timeColor.setDayNight(e2Time);
  }
}

export default game;
