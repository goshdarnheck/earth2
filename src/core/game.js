import Phaser from 'phaser';
import E2Time from './E2Time'
import Player from './Player'
import Clock from '../ui/Clock'
import TimeColor from '../ui/TimeColor'
import Cell from './Cell'
import world from '../data/world'

const game = () => {
  console.log(world)
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // physics: {
    //   default: 'arcade',
    //   arcade: {
    //     debug: true
    //   }
    // },
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

  const updateXY = (x, y) => {
    cellPos.x = x;
    cellPos.y = y;
  }

  const loadNorth = () => {
    if (world[cellPos.x][cellPos.y + 1]) {
      updateXY(cellPos.x, cellPos.y + 1)
    }
  }

  const loadSouth = () => {
    if (world[cellPos.x][cellPos.y - 1]) {
      updateXY(cellPos.x, cellPos.y - 1)
    }
  }

  const loadWest = () => {
    if (world[cellPos.x - 1] && world[cellPos.x - 1][cellPos.y]) {
      updateXY(cellPos.x - 1, cellPos.y)
    }
  }

  const loadEast = () => {
    if (world[cellPos.x + 1] && world[cellPos.x + 1][cellPos.y]) {
      updateXY(cellPos.x + 1, cellPos.y)
    }
  }

  function preload() {
    this.load.image('player', 'textures/Untitled.png');
  }

  function create() {
    this.input.keyboard.on('keydown_W', loadNorth);
    this.input.keyboard.on('keydown_S', loadSouth);
    this.input.keyboard.on('keydown_A', loadWest);
    this.input.keyboard.on('keydown_D', loadEast);

    earth2.cell = Cell(this)
  
    clock = this.add.text(16, 16, "", {
      fontSize: "32px",
      fill: "#fff",
    });
    posText = this.add.text(16, 48, "", {
      fontSize: "16px",
      fill: "#c60",
    });

    earth2.timeColor = TimeColor(this);
    earth2.cursors = this.input.keyboard.createCursorKeys();
    earth2.player = Player(this, earth2.cursors);
  }
  
  function update(time, delta) {
    e2Time.add(delta);

    earth2.player.update(delta);

    clock.setText(Clock(e2Time));
    posText.setText(`${world[cellPos.x][cellPos.y].name} ${cellPos.x} ${cellPos.y}`)
    earth2.timeColor.setDayNight(e2Time);
    earth2.cell.load(world[cellPos.x][cellPos.y], {
      top: world[cellPos.x][cellPos.y + 1],
      right: world[cellPos.x + 1] ? world[cellPos.x + 1][cellPos.y] : null,
      bottom: world[cellPos.x][cellPos.y - 1],
      left: world[cellPos.x - 1] ? world[cellPos.x - 1][cellPos.y] : null
    })
  }
}

export default game;
