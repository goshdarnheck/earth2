const Clock = (e2Time) => {
  return `Day ${e2Time.time.days + 1} ${e2Time.time.hours
    .toString()
    .padStart(2, "0")}:${e2Time.time.minutes.toString().padStart(2, "0")}`;
}

export default Clock;