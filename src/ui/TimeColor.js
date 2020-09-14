import config from '../config';

const TimeColor = (create) => {
  const circle = create.add.circle(800 - 30, 600 - 30, 20, 0x00ff00);
  let dn;

  if (config.DEBUG) {
    dn = create.add.text(800 - 100, 600 - 50, '?', {
      fontSize: '32px',
      fill: '#f00',
    });
  }

  return {
    setDayNight: (e2Time) => {
      const dayNightNormalized = e2Time.getDayNightNormalized();
      
      if (config.DEBUG && dn) dn.setText(dayNightNormalized);
      
      let hue = 0;
      let lightness = 1;
      let s = 1;

      if (dayNightNormalized < 0.1) {
        hue = 0.8;
        lightness = 0.3;
        s = 1;
      } else if (dayNightNormalized < 0.4) {
        hue = 0.7;
        lightness = 0.5;
        s = 1;
      } else if (dayNightNormalized < 0.6) {
        hue = 0.1;
        lightness = 1;
        s = 1;
      } else if (dayNightNormalized < 0.8) {
        hue = 0.3;
        lightness = 1;
        s = 0.5;
      } else {
        hue = 0.15;
        lightness = 1;
        s = 1;
      }

      var color = Phaser.Display.Color.HSVToRGB(hue, s, lightness).color;
      circle.setFillStyle(color, 1);
    },
  };
};

export default TimeColor;
