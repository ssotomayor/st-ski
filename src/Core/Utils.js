/**
 * Checks if two Rect instances intersect
 * @param {Number} min the minimal number of the random int
 * @param {Number} max the max number of the random int
 * @example 
 * randomInt(10, 10)
 * @returns {Number} Random int number
 */
export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if two Rect instances intersect
 * @param {Object<Rect>} rect1 the Rect instance
 * @param {Object<Rect>} rect2 the second Rect instance
 * @example 
 * intersectTwoRects(new Rect(10, 10, 10, 10), new Rect(10, 10, 10, 10))
 * @returns {Object} Object with which it collisioned
 */
export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}