const Health = (scene, health) => {
  const healthIndicator = scene.add.text(850, 0, health, {
    fontSize: "16px",
    fill: "#f00",
  });

  healthIndicator.setAlign('right');

  return {
    update: (health) => {
      healthIndicator.setText(health)
    }
  };
}

export default Health;