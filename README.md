# RadioRevolt.no API  [![CircleCI](https://circleci.com/gh/Studentmediene/RadioRevolt-API/tree/master.svg?style=svg&circle-token=857eae8d8a788eabadcd868e5153010c7b72227b)](https://circleci.com/gh/Studentmediene/RadioRevolt-API/tree/master)

## Workflow

1. Get a task under GitHub issues by talking to you teammates and looking at the sprint backlog. Our Kanban-board is [here](https://github.com/Studentmediene/RadioRevolt-API/projects/2)
2. Create a new branch  from the `dev`-branch, naming it using our branch naming strategy described below.
3. Code away and commit often. Try to follow [good commit practice](http://chris.beams.io/posts/git-commit/). Remember to write tests (and run them).
4. When you're done (see definition of done on GitHub), create a pull request with reference to the JIRA-issue (preferably a link) and an overview of what the pull request is about. Await code review (you can tag people or yell for them on Slack to get your review faster).
5. When you've reworked your code after the code review, the pull request will be merged.

_Please note that:_

* Only organisation admins can push directly to `master`
* Pull requests to master has to pass on Circle (tests), and must be approved through the GitHub review system.

### Branch naming strategy
The project has a strategy for what to name our branches, so that changes in them are easily traceable to issues here on GitHub. Another reason for having a naming strategy is that it makes it easy to find distinct types of proposed changes, as well as what's being worked on.

Name your branches in the following way, where `num` is a issue ID on GitHub:

* If it's a feature (new functionality) name the branch `feature/num`.
* If it's a bugfix name the branch `bugfix/num`.
* If it's a technical task, name the branch `tech/num`

## Setup
### Database
To setup the project locally install Postgres and set `PG_URL ` to your database. The format should `postgres://USERNAME:PASSWORD@localhost/DB`. The capitalized words should be replaced with your own values.

To export your variable on a Unix-system, simply use the `export` command, i.e. `export PG_URL=your value`.

### Local production environment
Run `npm run build` to get a transpiled version of the API, then start with `npm start`.

### Local development environment
If you're gonna develop the API, you'll need to set it up together with a database. So first set up a local Postgres database, then:

1. Install nodemon `npm install -g nodemon`
2. Run  `npm run start:dev` Remember that you can run it with environment variables in before the command, i.e. `PG_URL=value npm run start:dev`.

This will watch for changes and keep the application open for you.

### Local decelopment environment with Docker Compose

Docker can spin up the database and the API for you. This is great for when building something on top of the API, such as a mobile or web application. You set it up like this:

1. Install [Docker Compose](https://docs.docker.com/compose/install/)
2. Run `docker-compose up`, and the API will be available on your port 9000.

That's it!

## Tests

### Single run

* Run unit tests & code lint with `npm test`. This will use your local database.
* Run just unit tests with `npm run tests` with `NODE_ENV=test`. This will use your local database.

### Watch

Run the unit tests continuously with `npm run test:watch`. When there is detected changes in the code, only relevant tests will be ran again..
All tests will run when a server file is updated. This will use your local database.

## API

The API is available from `/` in the API. You can place this under whichever prefix you want on your server, i.e. `yourdomain.com/api` using Nginx or similar software.

The endpoints themselves are organized around the database entities: post, episode, category and show. The following subsections will describe available methods for each endpoint.

Remember to have set header `Content-Type` to `application/json`.

### Data model

#### Category

| Field | Type | Description | Required? | Default value|Can be null? |
|:--|:--|:--|:--|:--|
| id | Integer | Category ID, assigned by DBMS | No. | - | No|
| title | String | Category title.| No | Empty string | No|
| description | String | Category description | No | Empty string |No|

#### Episode

| Field | Type | Description | Required? | Default value| Can be null? |
|:--|:--|:--|:--|:--|
| id | Integer | Category ID, assigned by DBMS | No. | - | No|
| title | String | Episode title.| No | Empty string | No|
| lead | String | Lead/introduction/description for the episode. | Yes | Empty string | No|
| podcastUrl | String | URL to podcast RSS feed | No | Empty string | No|
| soundUrl | String |  | No | Empty string | No|
| showId | Integer |ID of an associated show. | No | `null` | Yes |



#### Show

| Field | Type | Description | Required? | Default value| Can be null? |
|:--|:--|:--|:--|:--|
| id | Integer | Category ID, assigned by DBMS | No. | - | No|
| title | String | Episode title.| No | Empty string | No|
| description | String | Description for the show. | Yes | Empty string | No|
| rssFeed | String | URL to podcast RSS feed | No | Empty string | No|
| logoImage| String | URL to logo image   | No | Empty string | No|
| lead | String | Lead/introduction/description for the show.| No | Emptry string | No|
| explicitContent | Boolean | Tells you if this show contains explicit content, such as slurs. | No | `false` | No |  
| archived | Boolean | Determines if the show is archived, i.e. no longer a running show | No | `false` | No |
| language | String of max 5 characters | The language used in the show. Used for i.e. Apple iTunes | No | `'no'` | No |


#### Post

| Field | Type | Description | Required? | Default value| Can be null? |
|:--|:--|:--|:--|:--|
| id | Integer | Category ID, assigned by DBMS | No. | - | No|
| title | String | Episode title.| No | Empty string | No|
| lead | String | Description for the s how. | Yes | Empty string | No|
| content | Text/Long string | The content of the post| No | Empty string | No|
| coverPhoto | String | URL to logo image   | No | Empty string | No|
| authorId | Integer | The id of the author of the post. Author can then be looked up in user service. | No | None | Yes |  
| pinned | Boolean | Determines if the post is pinned, i.e. meant to always be at the top of the page. | No | `false` | No |
| categoryId | Integer |ID of the category of the post | No | `null` | Yes |
| showId | Integer | ID of an associated show. | No | `null` | Yes |


### API endpoint specification

#### `/categories`

| Method | Path | Request data |What does it do?| Successful status code | Returns |
|:--|
| POST | `/`| Category object | Create category | `201 Created`| New object. |
| GET | `/`| -|  Get all categories | `200 OK`| Array of category objects |
| GET | `/id` | -|Get a specific category | `200 OK`| Category object of given id  |
| PUT | `/id`| Original category object with your changes |Update category of given ID| `204 No Content` |- |
| DELETE | `/id` | -|  Delete a category | `204 No Content`| - |


#### `/episodes`

| Method | Path | Request data |What does it do?| Successful status code | Returns |
|:--|
| POST | `/`| Episode object |Create episode | `201 Created`| New episode object |
| GET | `/`| - |Get all episodes | `200 OK`| Array of episode objects|
| GET | `/id` | -| Get a specific episode | `200 OK`| Episode object with the given id|
| PUT | `/id`| Original episode object with your changes |Update episode of given ID| `204 No Content` |- |
| DELETE | `/id` | -|  Delete an episode | `204 No Content`| -|


#### `/posts`

| Method | Path | Request data |What does it do?| Successful status code | Returns |
|:--|
| POST | `/`| New post object|Create post | `201 Created`|Newly created object |
| GET | `/`| -|Get all posts | `200 OK` | Array of post objects |
| GET | `/id` |-| Get a specific post | `200 OK` | Post object with the given id |
| PUT | `/id`| Original post object with your changes |Update post of given ID| `204 No Content` |- |
| DELETE | `/id` | -| Delete a post | `204 No Content`| - |


#### `/shows`

| Method | Path | Request data |What does it do?| Successful status code | Returns |
|:--|
| POST | `/`| New show object|Create show | `201 Created`|Newly created object|
| GET | `/`| -|Get all shows | `200 OK`| Array of show objects |
| GET | `/id` |-| Get specific show | `200 OK` |Show object with the given id|
| PUT | `/id`| Original show object with your changes |Update show of given ID| `204 No Content` |- |
| DELETE | `/id` |-| Delete a show | `204 No Content`| -|


## Credit
Based off of [this boilerplate](https://github.com/essoen/express-api-boilerplate).
