# Music Review application

## Project overview

### Music Review Application is a web service that allows users to search for tracks and artists and write reviews. Music metadata is fetched from [Last.Fm API](https://www.last.fm/api/intro). The project implements JWT-based authentication with cookies and is designed to be easily integrated with a frontend application in the future. Also project implements Redis-based caching to improve API performance and reduce response time.
### This project is a pet project created to practice backend development, REST API design using express js framework, and integration with external music services.

## Setup guide
### This project uses Docker containerization, to setup this project you need to install Docker https://www.docker.com/products/docker-desktop/

1) setup .env variables 
```bash
# by default it is 3000
PORT=8080

MONGO_URI="mongodb://mongodb:27017/MusicApp"
REDIS_URL="redis://redis:6379"

SECRET_ACCESS_TOKEN=""
SECRET_REFRESH_TOKEN=""


ACCESS_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=7d

SALT_ROUNDS="10"

# not neccessary, jamendo api is not using for now
JAMENDO_API_URL="https://api.jamendo.com/v3.0"
JAMENDO_API_CLIENT_ID=""
JAMENDO_API_SECRET=""

LASTFM_API_URL="https://ws.audioscrobbler.com/2.0"
LASTFM_API_KEY=""

NODE_ENV=development
```

2) run docker-compose.yml from root directory of project
```bash
docker compose up -d --build
# -d for running in background
# --build is just for build
```

to stop application run this
```bash
docker compose down
# if you want to clear db use -v flag
```

# API Documentation

## Auth Routes

### Login

Authentication endpoint to exchange user credentials for a logged-in session.

#### URL & Method

- **Method:** `POST`
    
- **URL:** `http://IP:PORT/api/auth/login`
    

#### Request Body

Send a JSON object with the following fields:

``` json
{
  "email": "user@example.com",
  "password": "string"
}

 ```

### Logout

Authentication endpoint to logout

#### URL & Method

- **Method:** `POST`
    
- **URL:** `http://IP:PORT/api/auth/logout`
    

#### Authorization

- **HTTP-only cookie**


### Register

Authentication endpoint to register new user

#### URL & Method

- **Method:** `POST`
    
- **URL:** `http://IP:PORT/api/auth/register`
    

#### Request body

``` json
{
    "name": "string",
    "email": "user@example.com",
    "password": "string"
}
 ```

### Refresh

Authentication endpoint to refresh access token, using refresh token

#### URL & Method

- **Method:** `POST`
    
- **URL:** `http://IP:PORT/api/auth/refresh`
    

#### Authorization

- **HTTP-only cookie** 



## User routes

### Profile

Users endpoint for getting profile information using access token

#### URL & Method

- **Method:** `GET`
    
- **URL:** `http://IP:PORT/api/users/profile`
    

#### Response Body

``` json
{
    "id": "string",
    "name": "string",
    "email": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Get profile of other user

Users endpoint for getting profile information of other user using access token

#### URL & Method

- **Method:** `GET`
    
- **URL:** `http://IP:PORT/api/users/profile/:id`
    

#### Response Body

``` json
{
    "id": "string",
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
 ```

#### Authorization

- **HTTP-only cookie** 

### User Search

Users endpoint for searching profile information of other user using access token

#### URL & Method

- **Method:** `GET`
    
- **URL:** `http://IP:PORT/api/users?page=&limit=&search=`
    

#### Response Body

``` json
{
    "items": [
        {
            "_id": "698685a9c2c7171c814bdc58",
            "name": "new",
            "createdAt": "2026-02-07T00:22:01.384Z"
        }
    ],
    "page": 1,
    "limit": 30,
    "total": 1,
    "totalPages": 1
}
 ```

#### Authorization

- **HTTP-only cookie** 


## Music metadata routes

### Tracks

Music metadata endpoint for searching tracks using access token

#### URL & Method

- **Method:** `GET`
    
- **EXAMPLE-URL:** `http://IP:PORT/api/music/tracks?track=clair de lune&page=1&limit=1&artist=Claude Debussy`
    

#### Response Body

``` json
{
    "results": {
        "opensearch:Query": {
            "#text": "",
            "role": "request",
            "searchTerms": "clair de lune",
            "startPage": "1"
        },
        "opensearch:totalResults": "39718",
        "opensearch:startIndex": "0",
        "opensearch:itemsPerPage": "1",
        "trackmatches": {
            "track": [
                {
                    "name": "Clair de lune",
                    "artist": "Claude Debussy",
                    "url": "https://www.last.fm/music/Claude+Debussy/_/Clair+de+lune",
                    "streamable": "0",
                    "listeners": "635612",
                    "image": [
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "small"
                        },
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "medium"
                        },
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "large"
                        },
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "extralarge"
                        }
                    ],
                    "mbid": "d778cceb-db41-4b8a-943d-2b4321cf300a"
                }
            ]
        },
        "@attr": {
            "for": "clair de lune"
        }
    }
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Artists

Music metadata endpoint for searching artists using access token

#### URL & Method

- **Method:** `GET`
    
- **EXAMPLE-URL:** `http://IP:PORT/api/music/artists?artist=Claude Debussy&page=1&limit=1`
    

#### Response Body

``` json
{
    "results": {
        "opensearch:Query": {
            "#text": "",
            "role": "request",
            "searchTerms": "Claude Debussy",
            "startPage": "1"
        },
        "opensearch:totalResults": "4716",
        "opensearch:startIndex": "0",
        "opensearch:itemsPerPage": "1",
        "artistmatches": {
            "artist": [
                {
                    "name": "Claude Debussy",
                    "listeners": "2018838",
                    "mbid": "be50643c-0377-4968-b48c-47e06b2e2a3b",
                    "url": "https://www.last.fm/music/Claude+Debussy",
                    "streamable": "0",
                    "image": [
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "small"
                        },
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "medium"
                        },
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "large"
                        },
                        {
                            "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                            "size": "extralarge"
                        }
                    ]
                }
            ]
        },
        "@attr": {
            "for": "Claude Debussy"
        }
    }
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Track Info

Music metadata endpoint for fetching track info using artist, track title and access token

#### URL & Method

- **Method:** `GET`
    
- **EXAMPLE-URL:** `http://IP:PORT/api/music/tracks/info?track=clair de lune&artist=Claude Debussy&mbid=`
    

#### Response Body

``` json
{
    "track": {
        "name": "Clair de lune",
        "mbid": "8d8fe1b4-d0a8-4956-aef8-6509563ce5b1",
        "url": "https://www.last.fm/music/Claude+Debussy/_/Clair+de+lune",
        "duration": "358000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "635376",
        "playcount": "3176394",
        "artist": {
            "name": "Claude Debussy",
            "mbid": "be50643c-0377-4968-b48c-47e06b2e2a3b",
            "url": "https://www.last.fm/music/Claude+Debussy"
        },
        "album": {
            "artist": "Claude Debussy",
            "title": "The Ultimate Most Relaxing Debussy in the Universe",
            "url": "https://www.last.fm/music/Claude+Debussy/The+Ultimate+Most+Relaxing+Debussy+in+the+Universe",
            "image": [
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/34s/0622acf15fdd4416bb1e934732aac82e.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/64s/0622acf15fdd4416bb1e934732aac82e.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/174s/0622acf15fdd4416bb1e934732aac82e.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/0622acf15fdd4416bb1e934732aac82e.png",
                    "size": "extralarge"
                }
            ]
        },
        "toptags": {
            "tag": []
        },
        "wiki": {
            "published": "27 Feb 2009, 01:22",
            "summary": "\"Clair de Lune' is actually the third and most famous movement of Claude Debussy's \"Suite Bergamasque.\" Although Debussy wrote the piece in 1890 at the age of 25, it was not published until 1905. By that time it had been partially re-written as well as re-titled. The original name of this piece was \"Promenade Sentimentale.\" The new title for the movement comes from a poem by the same name written by Paul Verlaie and means \"moonlight.\" <a href=\"http://www.last.fm/music/Claude+Debussy/_/Clair+de+lune\">Read more on Last.fm</a>.",
            "content": "\"Clair de Lune' is actually the third and most famous movement of Claude Debussy's \"Suite Bergamasque.\" Although Debussy wrote the piece in 1890 at the age of 25, it was not published until 1905. By that time it had been partially re-written as well as re-titled. The original name of this piece was \"Promenade Sentimentale.\" The new title for the movement comes from a poem by the same name written by Paul Verlaie and means \"moonlight.\" <a href=\"http://www.last.fm/music/Claude+Debussy/_/Clair+de+lune\">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply."
        }
    }
}
 ```

#### Authorization

- **HTTP-only cookie** 


## Review routes

### Create Review

review endpoint to create review using access token

#### URL & Method

- **Method:** `POST`
    
- **URL:** `http://IP:PORT/api/reviews`
    

#### Request body\
``` json
{
    "release": {
        "type": "track",
        "artist": "Claude Debussy",
        "title": "Clair de lune"
    },
    "rating": 4,
    "comment": "good release"
}
```

#### Response Body

``` json
{
    "release": {
        "type": "track",
        "artist": "Claude Debussy",
        "title": "Clair de lune",
        "mbid": null
    },
    "userId": "698685a9c2c7171c814bdc58",
    "rating": 4,
    "comment": "good release",
    "_id": "69873964f9a4c69b4a1a3d6c",
    "createdAt": "2026-02-07T13:08:52.654Z",
    "updatedAt": "2026-02-07T13:08:52.654Z",
    "__v": 0
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Get reviews paged using params

review endpoint to get paged reviews based on params using access token

#### URL & Method

- **Method:** `GET`
    
- **URL:** `http://IP:PORT/api/reviews/?title=Clair de lune&artist=Claude Debussy&page&limit`
    

#### Response Body

``` json
{
    "items": [
        {
            "release": {
                "type": "track",
                "artist": "Claude Debussy",
                "title": "Clair de lune",
                "mbid": null
            },
            "_id": "69873964f9a4c69b4a1a3d6c",
            "userId": "698685a9c2c7171c814bdc58",
            "rating": 4,
            "comment": "good release",
            "createdAt": "2026-02-07T13:08:52.654Z",
            "updatedAt": "2026-02-07T13:08:52.654Z",
            "__v": 0
        }
    ],
    "page": 1,
    "limit": 1,
    "total": 1,
    "totalPages": 1
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Get reviews paged using params

review endpoint to get review by id using access token

#### URL & Method

- **Method:** `GET`
    
- **URL:** `http://IP:PORT/api/reviews/:id`
    

#### Response Body

``` json
{
    "release": {
        "type": "track",
        "artist": "Claude Debussy",
        "title": "Clair de lune",
        "mbid": null
    },
    "_id": "69873964f9a4c69b4a1a3d6c",
    "userId": "698685a9c2c7171c814bdc58",
    "rating": 4,
    "comment": "good release",
    "createdAt": "2026-02-07T13:08:52.654Z",
    "updatedAt": "2026-02-07T13:08:52.654Z",
    "__v": 0
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Update Review

review endpoint to update review using access token

#### URL & Method

- **Method:** `PUT`
    
- **URL:** `http://IP:PORT/api/reviews/:id`
    

#### Request body
``` json
{
    "rating": "5",
    "comment": "best release"
}
```

#### Response Body

``` json
{
    "release": {
        "type": "track",
        "artist": "Claude Debussy",
        "title": "Clair de lune",
        "mbid": null
    },
    "_id": "69873964f9a4c69b4a1a3d6c",
    "userId": "698685a9c2c7171c814bdc58",
    "rating": 5,
    "comment": "best release",
    "createdAt": "2026-02-07T13:08:52.654Z",
    "updatedAt": "2026-02-07T13:15:31.802Z",
    "__v": 0
}
 ```

#### Authorization

- **HTTP-only cookie** 


### Delete Review

review endpoint to delete review using access token

#### URL & Method

- **Method:** `DELETE`
    
- **URL:** `http://IP:PORT/api/reviews/:id`

#### Authorization

- **HTTP-only cookie** 
