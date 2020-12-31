function fromArea(area) {
  return Math.sqrt(area / Math.PI);
}

function fromValue(value, minValue, maxValue, minArea, maxArea) {
  const area = (maxArea * (value - minValue)) / (maxValue - minValue);

  return Math.sqrt((area < minArea ? minArea : area) / Math.PI);
}

export default { fromArea, fromValue };
