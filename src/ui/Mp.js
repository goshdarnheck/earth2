const Mp = (scene, mp) => {
  const mpIndicator = scene.add.text(840, 30, mp, {
    fontSize: "32px",
    fontFamily: "Arial",
    fontStyle: "bold",
    fill: "#36f",
  });

  mpIndicator.setAlign('right');

  return {
    update: (mp) => {
      mpIndicator.setText(mp)
    }
  };
}

export default Mp;