const Clock = (scene, e2Time) => {
  const buildText = (e2Time) => {
    return e2Time
      ? `Day ${e2Time.time.days + 1} ${e2Time.time.hours.toString().padStart(2, "0")}:${e2Time.time.minutes.toString().padStart(2, "0")}`
      : ''
  }

  const clock = scene.add.text(0, 0, buildText(e2Time), {
    fontSize: "16px",
    fill: "#fff",
  });

  return {
    update: (e2Time) => {
      clock.setText(buildText(e2Time))
    }
  };
}

export default Clock;