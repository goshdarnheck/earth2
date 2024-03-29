const MS_IN_S = 1000;
const GAME_SECONDS_PER_REAL_SECOND = 60; // 60 makes days 24 minutes I think

class E2Time {
  constructor() {
    this.time = {
      elapsed: 0,
      seconds: 0,
      minutes: 0,
      hours: 12,
      days: 0
    };
  }

  add(delta) {
    this.time.elapsed += delta;
    this.time.seconds += (delta / MS_IN_S) * GAME_SECONDS_PER_REAL_SECOND;

    if (this.time.seconds >= 60) {
      this.time.seconds = 0;
      this.time.minutes++;
    }
  
    if (this.time.minutes >= 60) {
      this.time.minutes = 0;
      this.time.hours++;
    }
  
    if (this.time.hours >= 24) {
      this.time.hours = 0;
      this.time.days++;
    }
  }

  getDayNightNormalized() {
    const hours = this.time.hours + this.time.minutes / 60 + this.time.seconds / 3600;
    const normalizedDistance = (1 - Math.abs(hours - 12) / 6) / 2 + 0.5;
    return Number(normalizedDistance).toFixed(2);
  }
}

export default E2Time;