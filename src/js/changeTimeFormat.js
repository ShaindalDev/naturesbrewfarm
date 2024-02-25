export function changeTimeFormat(date = null) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  var today = new Date(date);

  return today.toLocaleDateString("en-US", options);
}
