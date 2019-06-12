# Southteams Ski

## Running it

```
npm install
npm run dev
```

## With Docker

Build the image, then run it.

```
docker build -f "Dockerfile" -t southteams-ski-v2:latest . 
docker run --rm -it -p 8080:8080/tcp southteams-ski-v2:latest  
```


# Changelog
* Docker deploy
* Fix "blizzard bug"
* Scores and lives (You may only crash twice)
* Pause with "p"
* Restart with "r"
* Added basic tests (Mocked canvas with jest-canvas-mock)
* Speeds up 10% every 2 seconds.. to make it harder
* Jump with SPACE BAR
* Rhino attacks you after 1000 points
* Added ramps

# Development log

## Docker 
I have to jump through several environments in my day-to-day, from Node versions to MongoDB and PostgreSQL versions. Docker makes it easier to do this and also easier to deploy so i'm used to develop it.

## Fix "blizzard bug":
When fixing the blizzard bug it was important to check why it wasn't happening when pressing "right" and only when pressing the left arrow key. Since the only difference was the (setDirection - 1) instead of + 1 i verified what was happening while debugging although it was very indicative of the retrieval of a property that was not there. 
Was fixed by verifying if the Skier was crashed, creating a method for this makes it easier for TESTING, and so, the isCrashed method was made

## Scores and lives (You may only crash twice)
Since it was easy to set a score based on the "y" position of the skier, it felt useful to create a ScoreManager to handle the drawing of this and telling you your lives as well.

## Pause with "p"
Since i developed games long long time ago i'm aware of the usual main loop that updates everything, however i was not aware that requestAnimationFrame was used for this in Javascript. It's simple to think that by checking a property and not running "requestAnimationFrame" would stop everything.

## Restart with "r"
Self-explanatory, it should simply reset everything to it's initial state.

## Added basic tests (Mocked canvas with jest-canvas-mock)
Testing canvas was a problem since jest can't get it right, however this mock canvas package does the trick. Tests are easy if the methods are pure and easy to set the states within the app/game.

## Speeds up 10% every 2 seconds.. to make it harder
Game-wise i'm not sure this works to make it "fun". However developing it with a setInterval and a fixed time between each seemed to be the way to go, although this could be refactored as a manager and sending the entities to be sped up.

## Jump with SPACE BAR
You may only jump while you are moving and also you can only jump certain obstacles. Since this is the case and we already have an Obstacle class, we can add a `jumpable` property to each and make it a boolean, then simply check if the Skier `isJumping` and the `Obstacle` is `jumpable`.

## Rhino attacks you after 1000 points
A rhino spawns after 1000 points (or skier is at 1000 in y position), the Rhino is an entity just like the Skier, since they both inherit from Entity it could be checked if they collision in a method of the parent class, or **make the Rhino extend from an Enemy class that inherits from Entity, this way we could use a factory pattern to spawn different enemies in the future** and not have part of the logic within the Game or Rhino. This would make it more extensible (Perhaps an EnemyManager?) however this requires a refactor and i'm time-bound for the moment.

## Added ramps
A ramp is a simple obstacle to be added except that when collisioning it should jump. Since we already had the jump functionality simply adding the ramp to be added as obstacles and executing the jump method when collisioning with one is enough.


# TODOS
* Adding highscores (perhaps the ScoreManager could handle those requests)
* Deploying it to Heroku 
* More tests
* More documentation with JSDoc
