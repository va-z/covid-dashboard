function fromArea(area) {
  return Math.sqrt(area / Math.PI);
}

function fromValue(val, minVal, maxVal, minArea, maxArea) {
  const area = (maxArea * (val - minVal)) / (maxVal - minVal);
  return Math.sqrt((area < minArea ? minArea : area) / Math.PI);
}

export default { fromArea, fromValue };
