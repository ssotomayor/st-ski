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
* Fix "blizzard bug"
* Scores and lives (You may only crash twice)
* Pause with "p"
* Restart with "r"
* Added basic tests (Mocked canvas with jest-canvas-mock)
* Speeds up 10% every 2 seconds.. to make it harder

# TODOS
* Jumping
* Rhino attack
