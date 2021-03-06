import { KEYS, LIVES } from './../../Constants'

/** @const {Number} [INITIAL_SCORE] the initial score */
/** @const {String} [FONT] The font of the text for score, lives and gameover text */
/** @const {String} [FONT_SIZE] font size of the text for score, lives and gameover text */

const INITIAL_SCORE = 0;
const FONT = 'Monaco, Tahoma';
const FONT_SIZE = '11px';

/**
 * A ScoreManager to handle drawing the scores and the endgame.
 */
export class ScoreManager {
    score = 0; // Your score
    scoreX = 20; // position to draw the score in the X axys
    scoreY = 50; // position to draw the score in the Y axys
    endingsCrash = ['broke a knee :(', 'broke a leg :(', 'can\'t stand up anymore :(']; // Ending messages when crashing

    /**
     * Constructor for the ScoreManager
     * @param {[Canvas]} canvasRef [A reference of the canvas where the game is drawn]
     */
    constructor(canvasRef) {
      this.canvas = canvasRef;
    }

    /**
     * Draws the score and crashes
     * @param {Number} score the score to be drawn
     * @param {Number} crashes the amount of crashes of the skier to be drawn
     * @example 
     * draw(1000, 1)
     * @returns
     */
    draw(score, crashes) {
      this.score = score;
      this.canvas.ctx.font = `${FONT} ${FONT_SIZE}`;
      this.canvas.ctx.fillText(`Lives: ${LIVES - crashes || 0}`, this.scoreX, this.scoreY - 20);
      this.canvas.ctx.fillText(`Points: ${this.score}`, this.scoreX, this.scoreY);
    }

    /**
     * Resets the score to it's INTIIAL_SCORE
     * @example 
     * resetScore()
     * @returns
     */    
    resetScore() {
        this.score = INITIAL_SCORE;
    }
    /**
     * Finishes the game and shows an ending text
     * @example 
     * endgame()
     * @returns
     */
    endGame(deadBy){
      let message;
      this.canvas.ctx.font = "normal 20px sans-serif";
      switch (deadBy) {
        case 'rhino':
          message = `Looks an angry rhino caught you! :(`
          break;
      
        default:
          message = `Looks like you ${this.endingsCrash[Math.floor(Math.random() * this.endingsCrash.length)]}`
          break;
      }
      this.canvas.ctx.fillText(message, this.canvas.width / 2 - 100, 50);
      this.canvas.ctx.fillText(`Press ${String.fromCharCode(KEYS.RESTART)} to Restart`, this.canvas.width / 2 - 100, 100);
    }
}
  