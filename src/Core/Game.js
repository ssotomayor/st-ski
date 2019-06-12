import * as Constants from "../Constants";
import { AssetManager } from "./Managers/AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "./Managers/ObstacleManager";
import { intersectTwoRects, Rect } from './Utils';
import { ScoreManager } from './Managers/ScoreManager';
import { Rhino } from '../Entities/Rhino';

export class Game {
    gameWindow = null; // The game window
    gameOver = false; // If the game is over
    speedUpInterval = null; // setInterval to speed up the skier
    paused = false; // If the game is paised
    caught = false; // If the player was caught
    rhino = null; // The enemy rhino
    caughtAnimationId; // The animation loop to be canceled on restart
    
    /**
     * Constructor for the main Game, sets event handler, 
     * initiates instances of managers, player and canvas, sets interval to speed up
     */
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
    
    /**
	 * Pauses the game
	 * @example 
	 * pauseGame()
	 * @returns
	 */        
    pauseGame() {
        this.paused = !this.paused;
    }

    /**
	 * Sets initial elements
	 * @example 
	 * init()
	 * @returns
	 */        
    init() {
        this.obstacleManager.placeInitialObstacles();
    }
    
    /**
	 * Loads assets asynchronously
	 * @example 
	 * load()
	 * @returns
	 */    
    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }
    
    /**
	 * Restarts the game and resets the stats
	 * @example 
	 * restart()
	 * @returns
	 */    
    restart(){
        if(this.gameOver) {
            this.gameOver = false;
            this.rhino = null;
            this.caught = false;
            clearInterval(this.speedUpInterval);
            this.speedUpInterval = setInterval(() => {
                this.skier.setSpeed(this.skier.speed * 1.1);
            }, Constants.SPEED_UP_INTERVAL);
            cancelAnimationFrame(this.caughtAnimationId);
            this.obstacleManager.resetObstacles();
            this.init();
            this.skier = new Skier(0, 0);
            this.skier.setPosition(0, 0);
            this.skier.setSpeed(Constants.SKIER_STARTING_SPEED);
            this.scoreManager.resetScore();
            this.run()
        }
    }
    
    /**
	 * Main game loop, updates and redraws
	 * @example 
	 * run()
	 * @returns
	 */        
    run() {
        !this.paused && this.canvas.clearCanvas();
        this.updateGameWindow();
        this.drawGameWindow();
        if(!this.gameOver) {
            requestAnimationFrame(this.run.bind(this));
        } else if (this.caught) {
            this.animateSkierCaught();
        }
    }

    /**
	 * Creates a new event loop to animate when the skier gets caught, must be canceled afterwards
	 * @example 
	 * animateSkierCaught()
	 * @returns
	 */
    animateSkierCaught() {
        this.canvas.clearCanvas();
        this.scoreManager.endGame('rhino');
        this.scoreManager.draw(Math.ceil(this.skier.y).toString(), Constants.LIVES);
        this.drawGameWindow();
        this.rhino.catch();
        this.caughtAnimationId = requestAnimationFrame(this.animateSkierCaught.bind(this));
    }
    
    /**
	 * Updates the game window and the enemies
	 * @example 
	 * updateGameWindow()
	 * @returns
	 */    
    updateGameWindow() {
        if(!this.paused) {
            if(this.skier.getCrashesAmount() === Constants.LIVES){
                this.gameOver = true;
            }
            this.skier.move();
            this.updateEnemyRhino();
            
            const previousGameWindow = this.gameWindow;
            this.calculateGameWindow();
            
            this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
            this.scoreManager.draw(Math.ceil(this.skier.y).toString(), this.skier.getCrashesAmount());
            this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
            if (this.gameOver) {
                this.gameOver = true;
                this.scoreManager.endGame(this.caught ? 'rhino' : '');
            }
        }
    }

    /**
	 * Updates the position of the main enemy of the game and sets if the skier gets caught
	 * @example 
	 * updateEnemyRhino()
	 * @returns
	 */
    updateEnemyRhino() {
        const skierPosition = this.skier.getPosition();
        if (skierPosition.y > Constants.RHINO_SPAWN_POINTS_THRESHOLD && !this.rhino) {
            this.rhino = new Rhino(skierPosition.x, skierPosition.y - Constants.RHINO_SPAWN_POSITION_FROM_SKIER);
        } else if (this.rhino) {
            this.rhino.move(skierPosition.x);
            const caught = this.rhino.caughtPlayer(this.skier, this.assetManager);
            if (caught) {
                this.rhino.catch();
                this.caught = true;
                this.gameOver = true;
            }
        }
    }
    
    /**
	 * Draws the game per loop
	 * @example 
	 * drawGameWindow()
	 * @returns
	 */
    drawGameWindow() {
        if(!this.paused) {
            this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
            this.skier.draw(this.canvas, this.assetManager);
            this.rhino && this.rhino.draw(this.canvas, this.assetManager);
            this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        }
    }
    
    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);
        
        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    /**
	 * handles key press down from the user
	 * @example 
	 * handleKeyDown()
	 * @returns
	 */
    handleKeyDown(event) {
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
                case Constants.KEYS.JUMP:
                    this.skier.jump();
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