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