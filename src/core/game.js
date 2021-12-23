import config from '../config';
import Phaser from 'phaser';
import E2Time from './E2Time'
import Player from './Player'
import Clock from '../ui/Clock'
import Debug from '../ui/Debug'
import TimeColor from '../ui/TimeColor'
import Hp from '../ui/Hp'
import Mp from '../ui/Mp'
import Cell from './Cell'
import world from '../data/world'

const game = () => {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: config.GAME_WIDTH,
    height: config.GAME_HEIGHT,
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
      x: 1,
      y: 0
    }
  }
  let ui = {
    clock: null,
    debug: null,
    hp: null,
    mp: null
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
    ui.hp = Hp(this, earth2.player.getHp());
    ui.mp = Mp(this, earth2.player.getMp());
    ui.timeColor = TimeColor(this);

    // LOAD CELL FROM WORLD DATA
    earth2.cell.load(
      state.cellPos,
      world,
      earth2.staticCollisionGroup,
      earth2.interactiveCollisionGroup,
      earth2.overlapGroup,
      earth2.detectGroup
    )

    // ADD COLLIDERS
    this.physics.add.collider(earth2.player, earth2.staticCollisionGroup);
    this.physics.add.collider(earth2.interactiveCollisionGroup, earth2.staticCollisionGroup);
    this.physics.add.collider(earth2.player, earth2.interactiveCollisionGroup, (player, other) => {
      if (other.isPickup) {
        other.destroy();
        player.addItem(other.pickupItem);
      }
      
      if (other.collisionDamage) {
        player.collideWith(other);
        other.collideWith(player);
      }
    });
    this.physics.add.overlap(earth2.player, earth2.overlapGroup, (player, zone) => {
      loadingNewCell = true;
      state.cellPos = { x: zone.to.x, y: zone.to.y };

      earth2.cell.load(
        state.cellPos,
        world,
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
  }
  
  function update(time, delta) {
    e2Time.add(delta);

    loadingNewCell = false

    earth2.player.update(delta);
    earth2.interactiveCollisionGroup.children.entries.forEach(object => {
      if (object.update) {
        object.update(delta)
      }
    })
    
    ui.clock.update(e2Time);
    ui.hp.update(earth2.player.getHp())
    ui.mp.update(earth2.player.getMp())
    ui.debug.update(world[state.cellPos.x][state.cellPos.y])
    ui.timeColor.setDayNight(e2Time);
  }
}

export default game;
