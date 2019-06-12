import "babel-polyfill";
import { SKIER_DIRECTIONS } from '../Constants';
import { Skier } from '../Entities/Skier';
import { Rhino } from '../Entities/Rhino';
import { Game } from '../Core/Game';
import { ObstacleManager } from '../Core/Managers/ObstacleManager';

describe('Obstacles tests', () => {
    let obstacleManager;
    beforeEach(() => {
        obstacleManager = new ObstacleManager();
    });

    describe('ObstacleManager Methods', () => {
        it('Should reset obstacles', () => {
            obstacleManager.resetObstacles();
            expect(obstacleManager.obstacles).toBe.empty;
        });
    });
});

describe('Game tests', () => {
    let game;
    beforeEach(() => {
      game = new Game();
    });

    describe('Game Methods', () => {
        it('Should pause and unpause the game', () => {
            game.pauseGame();
            expect(game.paused).toBe(true);
            game.pauseGame();
            expect(game.paused).toBe(false);
        });
    });
});

describe('Skier Entity', () => {
    const skier = new Skier(0, 0);
    describe('Skier Crash tests', () => {

        beforeEach(() => {
            skier.direction = SKIER_DIRECTIONS.CRASH;
        });

        it('Should return true when crashed', () => {
            expect(skier.isCrashed()).toBe(true);
        });

        it('Should not overflow when turning left', () => {
            skier.turnLeft()
            expect(skier.direction).toBe(SKIER_DIRECTIONS.LEFT);
        });

        it('Should not overflow when turning right', () => {
            skier.turnRight()
            expect(skier.direction).toBe(SKIER_DIRECTIONS.RIGHT);
        });      

        it('Should not be able to move down when crashed', () => {
            skier.turnDown();
            expect(skier.direction).toBe(SKIER_DIRECTIONS.CRASH);
        });

        });

    describe('Skier Moving tests', () => {

        beforeEach(() => {
            skier.direction = SKIER_DIRECTIONS.DOWN;
        });

        it('Should not overflow when spamming movement to the left and right', () => {
            for (let i = 0; i < 10; i++) {
                skier.turnLeft();
            }
            expect(skier.direction).toBe(SKIER_DIRECTIONS.LEFT);

            for (let i = 0; i < 10; i++) {
                skier.turnRight();
            }
            expect(skier.direction).toBe(SKIER_DIRECTIONS.RIGHT);
        });

    });        

});