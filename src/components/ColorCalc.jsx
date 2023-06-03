function getColorFromValue(value) {
  if (value === 0) {
    return "white";
  } else if (value < 0) {
    return "red";
  } else {
    const greenValue = Math.floor((value / 0.5) * 100);
    return `rgb(0, ${greenValue}, 0)`;
  }
}

function getColorFromTotalValue(value) {
  if (value === 0) {
    return "white";
  } else if (value >= 2) {
    return "green";
  } else if (value < 0) {
    return "red";
  } else {
    const greenValue = Math.floor((2 / value) * 255);
    return `rgb(0, ${greenValue}, 0)`;
  }
}

export { getColorFromValue, getColorFromTotalValue };
