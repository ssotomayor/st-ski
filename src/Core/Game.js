import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { ScoreManager } from './Score';

export class Game {
    gameWindow = null;
    gameOver = false;
    speedUpInterval = null;
    paused = false;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();
        this.scoreManager = new ScoreManager(this.canvas, this.skier.getCrashesAmount());
        
        this.speedUpInterval = setInterval(() => {
            this.skier.setSpeed(this.skier.speed * 1.1);
        }, Constants.SPEED_UP_INTERVAL);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    pauseGame() {
        this.paused = !this.paused;
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    restart(){
        if(this.gameOver) {
            this.gameOver = false;
            clearInterval(this.speedUpInterval);
            this.speedUpInterval = setInterval(() => {
                this.skier.setSpeed(this.skier.speed * 1.1);
            }, Constants.SPEED_UP_INTERVAL);
            this.obstacleManager.resetObstacles();
            this.init();
            this.skier = new Skier(0, 0);
            this.skier.setPosition(0, 0);
            this.skier.setSpeed(Constants.SKIER_STARTING_SPEED);
            this.scoreManager.resetScore();
            this.run()
        }
    }

    run() {
        !this.paused && this.canvas.clearCanvas();
        this.updateGameWindow();
        this.drawGameWindow();
        if(!this.gameOver) {
            requestAnimationFrame(this.run.bind(this));
        }
    }

    updateGameWindow() {
        if(!this.paused) {
            if(this.skier.getCrashesAmount() === Constants.LIVES){
                this.gameOver = true;
                this.scoreManager.endGame();
            }
            this.skier.move();

            const previousGameWindow = this.gameWindow;
            this.calculateGameWindow();
            
            this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
            this.scoreManager.draw(Math.ceil(this.skier.y).toString(), this.skier.getCrashesAmount());
            this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        }
    }

    drawGameWindow() {
        if(!this.paused) {
            this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

            this.skier.draw(this.canvas, this.assetManager);

            this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        }
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        console.log(event.which);
        if(!this.gameOver) {
            switch(event.which) {
                case Constants.KEYS.LEFT:
                    this.skier.turnLeft();
                    event.preventDefault();
                    break;
                case Constants.KEYS.RIGHT:
                    this.skier.turnRight();
                    event.preventDefault();
                    break;
                case Constants.KEYS.UP:
                    this.skier.turnUp();
                    event.preventDefault();
                    break;
                case Constants.KEYS.DOWN:
                    this.skier.turnDown();
                    event.preventDefault();
                    break;
                case Constants.KEYS.RESTART:
                    this.restart();
                    event.preventDefault();
                    break;
                case Constants.KEYS.PAUSE:
                    this.pauseGame();
                    event.preventDefault();
                    break;
            }
        } else {
            if(event.which === Constants.KEYS.RESTART){
                this.restart();
            }
        }
    }
}