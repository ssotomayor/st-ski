import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects, Rect } from '../Core/Utils';

/**
 * An enemy Rhino to chase the player
 */
export class Rhino extends Entity {
    assetName = Constants.RHINO;
    catchFramesTotal = Object.keys(Constants.RHINO_EAT_FRAMES_ASSET).length * 10; // 10 frames per asset
    catchFrames = Object.keys(Constants.RHINO_EAT_FRAMES_ASSET).length;
    speed = Constants.RHINO_RUN_SPEED;
    catchFrame = 0;
    runAnimationTiming = 100;
    
    constructor(x, y) {
        super(x, y);
    }

    /**
     * Updates asset of the skier
     * @param {String} action could be 'move' or 'catch' whether the Rhino should be running or executing the animation to catch the skier
     * @example 
     * updateAsset('run')
     * @returns
     */
    updateAsset(action) {
        switch (action) {
            case 'move':
                const animationFrame = Math.ceil(this.y / this.runAnimationTiming) % 2;
                this.assetName = Constants.RHINO_RUN_ASSET[animationFrame];
            break;
            case 'catch':
                const eatingAsset = Math.ceil(this.catchFrame / (this.catchFramesTotal / this.catchFrames));
                this.assetName = Constants.RHINO_EAT_FRAMES_ASSET[eatingAsset];
            break;
        }
    }
    
    /**
     * Checks and moves the rhino on the y axis
     * @example 
     * move()
     * @returns
     */
    move(x) {
        this.x = x;
        this.y += this.speed;
        this.updateAsset('move');
    }
    
    /**
     * Catches the skier and starts the eating animation
     * @example 
     * catch()
     * @returns
     */
    catch() {
        this.catchFrame++;
        if (this.catchFrame < this.catchFramesTotal) {
            this.updateAsset('catch');
        }
    }

    /**
     * Checks if the enemy caught the player
     * @param {Object<Skier>} player The skier to check if it was caught
     * @param {Object<AssetManager>} assetManager The asset manager to get the bounds and check for intersection
     * @example 
     * caughtSkier(new Skier(0,0), new AssetManager())
     * @returns {Object} intersected object
     */
    caughtPlayer(player, assetManager) {
        const playerPosition = player.getPosition();

        const playerAssets = assetManager.getAsset(player.assetName);
        const rhinoAssets = assetManager.getAsset(this.assetName);

        const rhinoHitbox = new Rect(
            this.x - rhinoAssets.width / 2,
            this.y - rhinoAssets.height / 2,
            this.x + rhinoAssets.width / 2,
            this.y - rhinoAssets.height / 4
        );

        const playerHitbox = new Rect(
            playerPosition.x - playerAssets.width / 2,
            playerPosition.y - playerAssets.height / 2,
            playerPosition.x + playerAssets.width / 2,
            playerPosition.y - playerAssets.height / 4
        );
        
        return intersectTwoRects(playerHitbox, rhinoHitbox);
    }
}
