import Phaser from 'phaser';
import E2Time from './E2Time'
import Clock from '../ui/Clock'
import TimeColor from '../ui/TimeColor'

const game = () => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      create: create,
      update: update,
    },
    pixelArt: true
  };

  const game = new Phaser.Game(config);
  const e2Time = new E2Time();
  
  let earth2 = {};
  
  let clock;

  function create() {
    clock = this.add.text(16, 16, "", {
      fontSize: "32px",
      fill: "#fff",
    });

    earth2.timeColor = TimeColor(this);
  }
  
  function update(time, delta) {
    e2Time.add(delta);

    clock.setText(Clock(e2Time));
    earth2.timeColor.setDayNight(e2Time);
  }
}

export default game;
