function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function filterUser(source, filterTo, filterBy) {
  const user = source.filter((one) => one[filterTo] === filterBy);
  return user[0];
}

const randomDigit = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export { classNames, filterUser, randomDigit };

export function isVibrant(
  red,
  green,
  blue,
  saturationThreshold = 0.5,
  minIntensity = 0.2,
  maxIntensity = 0.9
) {
  // Convert RGB to HSV
  const hsvColor = rgbToHsv(red, green, blue);

  // Extract components
  const saturation = hsvColor.s;
  const intensity = hsvColor.v;

  // Define criteria for vibrancy
  return (
    0.2 < saturation &&
    saturation < saturationThreshold &&
    minIntensity < intensity &&
    intensity < maxIntensity
  );
}

// RGB to HSV conversion function
function rgbToHsv(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h, s, v;

  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }

  s = max === 0 ? 0 : delta / max;
  v = max;

  return { h, s, v };
}
