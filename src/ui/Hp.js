const Health = (scene, health) => {
  const healthIndicator = scene.add.text(850, 0, health, {
    fontSize: "32px",
    fontFamily: "Arial",
    fontStyle: "bold",
    fill: "#f03",
  });

  healthIndicator.setAlign('right');

  return {
    update: (health) => {
      healthIndicator.setText(health)
    }
  };
}

export default Health;