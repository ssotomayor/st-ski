import { KEYS, LIVES } from '../Constants'

const INITIAL_SCORE = 0;
const FONT = 'Monaco, Tahoma';
const FONT_SIZE = '11px';

export class ScoreManager {
    score = 0;
    scoreX = 20;
    scoreY = 50;
    ending = null;
    endings = ['broke a knee :(', 'broke a leg :(', 'Can\'t stand up anymore :(']

    constructor(canvasRef) {
      this.canvas = canvasRef;
    }
  
    draw(score, crashes) {
      this.score = score;
      this.canvas.ctx.font = `${FONT} ${FONT_SIZE}`;
      this.canvas.ctx.fillText(`Lives: ${LIVES - crashes || 0}`, this.scoreX, this.scoreY - 20);
      this.canvas.ctx.fillText(`Points: ${this.score}`, this.scoreX, this.scoreY);
    }

    resetScore() {
        this.score = INITIAL_SCORE;
    }

    endGame(){
      this.canvas.ctx.font = "normal 20px sans-serif";
      this.canvas.ctx.fillText(`Looks like you... ${this.endings[Math.floor(Math.random() * this.endings.length)]}`, this.canvas.width / 2 - 100, 50);
      this.canvas.ctx.fillText(`Press ${String.fromCharCode(KEYS.RESTART)} to Restart`, this.canvas.width / 2 - 100, 100);
    }
}
  