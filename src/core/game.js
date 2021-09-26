import Phaser from 'phaser';
import E2Time from './E2Time'
import Player from './Player'
import Clock from '../ui/Clock'
import TimeColor from '../ui/TimeColor'
import Cell from './Cell'
import world from '../data/world'

const game = () => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        checkCollision: { up: true, down: true, left: true, right: true }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    pixelArt: true
  };

  const game = new Phaser.Game(config);
  const e2Time = new E2Time();
  
  let earth2 = {};
  let cellPos = {
    x: 0,
    y: 0
  }
  let clock;
  let posText;
  let loadingNewCell = false;
  let overlapCollider = null;

  function preload() {
    this.load.image('player', 'textures/player.png');
    this.load.image('evergreen', 'textures/evergreen.png');
  }

  function create() {
    earth2.cell = Cell(this)
    earth2.staticCollisionGroup = this.add.group()
    earth2.overlapGroup = this.add.group()
  
    clock = this.add.text(16, 16, "", {
      fontSize: "32px",
      fill: "#fff",
    });
    posText = this.add.text(16, 48, "", {
      fontSize: "16px",
      fill: "#c60",
    });

    earth2.timeColor = TimeColor(this);
    earth2.player = Player(this);

    earth2.cell.load(
      world[cellPos.x][cellPos.y],
      {
        top: world[cellPos.x][cellPos.y + 1],
        right: world[cellPos.x + 1] ? world[cellPos.x + 1][cellPos.y] : null,
        bottom: world[cellPos.x][cellPos.y - 1],
        left: world[cellPos.x - 1] ? world[cellPos.x - 1][cellPos.y] : null
      },
      earth2.staticCollisionGroup,
      earth2.overlapGroup
    )

    this.physics.add.collider(earth2.player.getSprite(), earth2.staticCollisionGroup, () => {
      // console.log("collide")
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
    clock.setText(Clock(e2Time));
    posText.setText(`${world[cellPos.x][cellPos.y].name} ${cellPos.x} ${cellPos.y}`)
    earth2.timeColor.setDayNight(e2Time);
  }
}

export default game;
