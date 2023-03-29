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

/**
 * @param {string} time 'HH:MM'
 */
export function convertTime (time, timeZone) {
  const today = new Date();
  const splitTime = time.split(":");

  today.setHours(splitTime[0], splitTime[1], 0);

  return today.toLocaleTimeString("en-US", {
      timeZone,
      timeStyle: "short",
      hour12: false,
    })
}
