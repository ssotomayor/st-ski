import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    crashesAmount = 0;
    isJumping = false;
    jumpFrame = null;
    jumpLength = 20;

    constructor(x, y) {
        super(x, y);
        this.crashesAmount = 0;
    }
    
    /**
	 * Sets the direction of the skier and updates the asset
	 * @example 
	 * setDirection(5) // 5 is left
	 * @returns
	 */  
    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    /**
	 * Sets speed of the skier
	 * @example 
	 * setSpeed(10)
	 * @returns
	 */  
    setSpeed(speed){
        this.speed = speed;
    }

    /**
	 * Sets the position of the skier in the x, y axis
	 * @example 
	 * setPosition(10, 10)
	 * @returns
	 */  
    setPosition(x, y){
        this.x = 0;
        this.y = 0;
    }

    /**
	 * Gets the amount of crashes the skier had.
	 * @example 
	 * getCrashesAmount()
	 * @returns {Number} The amount of crashes.
	 */        
    getCrashesAmount(){
        return this.crashesAmount;
    }

    /**
	 * Sets the amount of crashes the skier had.
	 * @example 
	 * setCrashesAmount(1)
	 * @returns {Number} The amount of crashes.
	 */    
    setCrashesAmount(crashesAmount){
        return this.crashesAmount = crashesAmount;
    }

    /**
	 * Updates asset of the skier
	 * @example 
	 * updateAsset()
	 * @returns
	 */
    updateAsset() {
        if (this.isJumping && !this.isCrashed()) {
            const jumpSize = this.jumpLength / Object.keys(Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.JUMP]).length;
            const jumpFrame = Math.ceil(this.jumpFrame / jumpSize);
            this.assetName = Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.JUMP][jumpFrame];
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
        }
    }

    /**
	 * Checks if the skier is moving (considered moving if not standing and actively skiing)
	 * @example 
	 * isMoving()
	 * @returns {boolean} True if it's moving
	 */    
    isMoving(){
        return this.direction === Constants.SKIER_DIRECTIONS.LEFT_DOWN ||
                this.direction === Constants.SKIER_DIRECTIONS.DOWN ||
                this.direction === Constants.SKIER_DIRECTIONS.RIGHT_DOWN
    }

    /**
	 * Starts animation and jump of the Skier
	 * @example 
	 * jump()
	 * @returns
	 */
    jump() {
        if (this.isMoving()) {
          this.isJumping = true;
          this.jumpFrame = this.jumpLength;
          this.updateAsset();
        }
      }

    /**
	 * Checks and moves the skier after checking it's direction property
	 * @example 
	 * move()
	 * @returns
	 */
    move() {
        if (this.isJumping) {
            this.jumpFrame--;
            if (this.jumpFrame === 0) {
              this.isJumping = false;
            }
            this.updateAsset();
        }
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    /**
	 * Moves skier left in the x axis
	 * @example 
	 * moveSkierLeft()
	 * @returns
	 */
    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    /**
	 * Moves skier diagonally (left-down) in the x, y axis
	 * @example 
	 * moveSkierLeftDown()
	 * @returns
	 */
    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
	 * Moves skier down in the y axis
	 * @example 
	 * moveSkierDown()
	 * @returns
	 */
    moveSkierDown() {
        this.y += this.speed;
    }

    /**
	 * Moves skier diagonally right down in the x, y axis
	 * @example 
	 * moveSkierRightDown()
	 * @returns
	 */
    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
	 * Moves skier right right in the x
	 * @example 
	 * moveSkierRight()
	 * @returns
	 */    
    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    /**
	 * Moves skier up right in the y axis
	 * @example 
	 * moveSkierUp()
	 * @returns
	 */        
    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    /**
	 * Checks if the skier has crashed
	 * @example 
	 * isCrashed()
	 * @returns {boolean}
	 */
    isCrashed() {
        return this.direction === Constants.SKIER_DIRECTIONS.CRASH
    }

    /**
	 * Turns/moves skier left. If it's crashed, it turns it left without moving down
	 * @example 
	 * turnLeft()
	 * @returns
	 */
    turnLeft() {
        if( this.isCrashed()) { this.setDirection(Constants.SKIER_DIRECTIONS.LEFT) }

        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    /**
	 * Turns/moves skier right. If it's crashed, it turns it right without moving down
	 * @example 
	 * turnRight()
	 * @returns
	 */    
    turnRight() {

        if(this.isCrashed()) { this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT) }

        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    /**
	 * Turns/moves skier up only if it's stopped and facing left or right.
	 * @example 
	 * turnUp()
	 * @returns
	 */
    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    /**
	 * Turns/moves skier down only if it's NOT crashed.
	 * @example 
	 * turnDown()
	 * @returns
	 */    
    turnDown() {
        !this.isCrashed() && this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    /**
     * Checks if skier hits an obstacle and sets the skier as crashed
     * @param {Object<ObstacleManager>} obstacleManager An instance of an ObstacleManager
     * @param {Object<AssetManager>} assetManager An instance of an AssetManager
     * @example 
     * checkIfSkierHitObstacle(new ObstacleManager(), new AssetManager());
     * @returns
     */
    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collisionObstacle = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            if (this.isJumping && obstacle.jumpable) {
                return;
            }

            return intersectTwoRects(skierBounds, obstacleBounds);
            
        });

        if(collisionObstacle) {
            if(this.direction !== Constants.SKIER_DIRECTIONS.CRASH 
                && this.direction !== Constants.SKIER_DIRECTIONS.LEFT 
                && this.direction !== Constants.SKIER_DIRECTIONS.RIGHT
                && collisionObstacle.assetName !== Constants.RAMP){
                this.crashesAmount++;
            }

            if (collisionObstacle.assetName === Constants.RAMP) {
                this.jump();
            } else {
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            }
        }
    };
}