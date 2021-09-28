import { DEBUG, TILE_SIZE } from '../config';

const TimeColor = (scene) => {
  const circle = scene.add.circle(TILE_SIZE * 26, TILE_SIZE * 14, 16, 0x00ff00).setOrigin(0, 0);
  let dn;

  if (DEBUG) {
    dn = scene.add.text(TILE_SIZE * 26,  TILE_SIZE * 14, '?', {
      fontSize: '12px',
      fill: '#000',
    });
  }

  return {
    setDayNight: (e2Time) => {
      const dayNightNormalized = e2Time.getDayNightNormalized();
      
      if (DEBUG && dn) dn.setText(dayNightNormalized);
      
      let h = 0;
      let v = 1;
      let s = 1;

      if (dayNightNormalized < 0.1) {
        h = 0.8;
        v = 0.3;
        s = 1;
      } else if (dayNightNormalized < 0.4) {
        h = 0.7;
        v = 0.5;
        s = 1;
      } else if (dayNightNormalized < 0.6) {
        h = 0.9;
        v = 1;
        s = 1;
      } else if (dayNightNormalized < 0.8) {
        h = 0.15;
        v = 1;
        s = 0.5;
      } else {
        h = 0.15;
        v = 1;
        s = 0.2;
      }

      var color = Phaser.Display.Color.HSVToRGB(h, s, v).color;
      circle.setFillStyle(color, 1);
    },
  };
};

export default TimeColor;
