import config from '../config';

const TimeColor = (scene) => {
  const circle = scene.add.circle(800 - 30, 600 - 30, 20, 0x00ff00);
  let dn;

  if (config.DEBUG) {
    dn = scene.add.text(800 - 40, 600 - 40, '?', {
      fontSize: '12px',
      fill: '#000',
    });
  }

  return {
    setDayNight: (e2Time) => {
      const dayNightNormalized = e2Time.getDayNightNormalized();
      
      if (config.DEBUG && dn) dn.setText(dayNightNormalized);
      
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
