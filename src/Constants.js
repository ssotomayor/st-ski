export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

// Skier
export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP_FRAME_1 = 'skierJump1';
export const SKIER_JUMP_FRAME_2 = 'skierJump2';
export const SKIER_JUMP_FRAME_3 = 'skierJump3';
export const SKIER_JUMP_FRAME_4 = 'skierJump4';
export const SKIER_JUMP_FRAME_5 = 'skierJump5';
export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const LIVES = 2;

// Obstacles
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RAMP = 'ramp';

export const SPEED_UP_INTERVAL = 2000;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [SKIER_JUMP_FRAME_1]: 'img/skier_jump_1.png',
    [SKIER_JUMP_FRAME_2]: 'img/skier_jump_2.png',
    [SKIER_JUMP_FRAME_3]: 'img/skier_jump_3.png',
    [SKIER_JUMP_FRAME_4]: 'img/skier_jump_4.png',
    [SKIER_JUMP_FRAME_5]: 'img/skier_jump_5.png',
    [RAMP]: 'img/jump_ramp.png'
};

export const JUMPABLE_OBSTACLES = {
    [RAMP]: true,
    [ROCK1]: true,
    [ROCK2]: true,
    [TREE]: false,
    [TREE_CLUSTER]: false
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5,
    JUMP: 6
};;

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMP] : {
        1: SKIER_JUMP_FRAME_1,
        2: SKIER_JUMP_FRAME_2,
        3: SKIER_JUMP_FRAME_3,
        4: SKIER_JUMP_FRAME_4,
        5: SKIER_JUMP_FRAME_5
    }
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    RESTART: 82,
    PAUSE: 80,
    JUMP: 32
};