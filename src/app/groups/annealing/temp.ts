function linear_change_temp(
  max_temp: number,
  min_temp: number,
  steps: number,
  step: number,
): number {
  return max_temp - (max_temp - min_temp) * (step / steps);
}

function logarithmic_change_temp(
  max_temp: number,
  min_temp: number,
  steps: number,
  step: number,
): number {
  return max_temp / (Math.log(1 + step) || 0.0001);
}

export function change_temp(
  max_temp: number,
  min_temp: number,
  steps: number,
  step: number,
): number {
  // You can comment/uncomment the line depending on whether you want to use linear or logarithmic temperature change
  // return logarithmic_change_temp(max_temp, min_temp, steps, step);
  return linear_change_temp(max_temp, min_temp, steps, step);
}
