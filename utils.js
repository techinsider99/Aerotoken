export const calculateTime = timeString => {
  let hours = timeString.getHours();
  let minutes = timeString.getMinutes();
  let seconds = timeString.getSeconds();
  let zone = hours > 12 ? 'PM' : 'AM';
  hours = zone === 'PM' ? hours - 12 : hours;
  return `${hours}:${minutes}:${seconds} ${zone}`;
};
