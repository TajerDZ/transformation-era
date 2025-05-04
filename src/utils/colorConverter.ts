/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Convert Hex color to rgb
 * @param hex
 */

export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

  hex = hex.replace(shorthandRegex, (_m: string, r: string, g: string, b: string) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? `${Number.parseInt(result[1], 16)},${Number.parseInt(result[2], 16)},${Number.parseInt(result[3], 16)}` : null
}

/**
 *RGBA color to Hex color with / without opacity
 */
export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  return (
    `#${rgba
      .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((_string, index) => !forceRemoveAlpha || index !== 3)
      .map(string => Number.parseFloat(string)) // Converts them to numbers
      .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      .map(number => number.toString(16)) // Converts numbers to hex
      .map(string => (string.length === 1 ? `0${string}` : string)) // Adds 0 when length of one number is 1
      .join('')}`
  )
}

export const getContrastingColor = (hexColor: any) => {
  // Remove the '#' if present
  hexColor = hexColor.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate the brightness using the YIQ formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white based on brightness
  return yiq >= 150 ? '#000000' : '#FFFFFF';
}
