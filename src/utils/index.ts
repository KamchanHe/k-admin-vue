/**
 * Check if an element has a class
 * @param {HTMLElement} element
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(element: HTMLElement, cls: string) {
  return !!element.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}

/**
 * Add class to element
 * @param {HTMLElement} element
 * @param {string} cls
 */
export function addClass(element: HTMLElement, cls: string) {
  if (!hasClass(element, cls)) element.className += ` ${cls}`;
}

/**
 * Remove class from element
 * @param {HTMLElement} element
 * @param {string} cls
 */
export function removeClass(element: HTMLElement, cls: string) {
  if (hasClass(element, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
    element.className = element.className.replace(reg, ' ');
  }
}

export function mix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);
  const rStr = `0${(r || 0).toString(16)}`.slice(-2);
  const gStr = `0${(g || 0).toString(16)}`.slice(-2);
  const bStr = `0${(b || 0).toString(16)}`.slice(-2);
  return `#${rStr}${gStr}${bStr}`;
}

export default {};
