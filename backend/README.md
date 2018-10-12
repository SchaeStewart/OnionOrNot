# Onion Or Not - Backend

## Getting Started
```
docker-compose build
docker-compose up # optional -d to run in background
npm run migrate:up

## API
[/] Litmus test to see if server is up. Should see welcome message
`GET` [/api/onion-or-not] - Returns a title and id
`POST` [/api/onion-or-not] - accepts x-www-form-urlencoded data 
```
id: (the id from the get request)
theonion: bool
```
