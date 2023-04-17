import moment from 'moment'

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
 * @param {string} timeZone 'America/New_York'
 * @returns {string} 'HH:MM'
 */
export function convertTimeByTimeZoneName (time, timeZone) {
  const today = new Date();
  const [hours, minutes] = time.split(":");

  today.setHours(hours, minutes, 0);

  return today.toLocaleTimeString("en-US", {
      timeZone,
      timeStyle: "short",
      hour12: false,
    })
}


/**
 * @param {string} time 'HH:mm'
 * @param {string} timeZoneUTCOffset '+3'
 * @returns {string} 'HH:mm'
 */
export function convertTimeByTimeZoneUTCOffset (time, utcOffset, dstOffset) {
  const offset = moment().isDST() ? dstOffset : utcOffset;

  return moment(time, "HH:mm").utcOffset(offset).format("HH:mm");
}
