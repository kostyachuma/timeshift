export function timeToMs(timeString = "00:00") {
  const hours = timeString.split(":")[0];
  const minutes = timeString.split(":")[1];
  return hours * 3600000 + minutes * 60000;
}

export function msToTime(ms = 0) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const format = (value) => `${value < 10 ? "0" : ""}${value}`;
  return format(hours) + ":" + format(minutes);
}
