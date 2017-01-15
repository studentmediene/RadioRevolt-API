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
If you're gonna develop:

1. Install nodemon `npm install -g nodemon`
2. Run  `npm run start:dev` Remember that you can run it with environment variables in before the command, i.e. `PG_URL=value npm run start:dev`.

This will watch for changes and keep the application open for you.

### Local decelopment environment with Docker Compose

Docker can spin up the DB and the API for you, i.e. for when you're working on a frontend component such as a webapp.

1. Install [Docker Compose](https://docs.docker.com/compose/install/)
2. Run `docker-compose up`, and the API will be available on your port 9000.

## Tests

### Single run

* Run unit tests & code lint with `npm test`. This will use your local database.
* Run just unit tests with `npm run tests` with `NODE_ENV=test`. This will use your local database.

### Watch

Run the unit tests continuously with `npm run test:watch`, only the tests currently worked on will run when updated.
All tests will run when a server file is updated. This will use your local database.

## Credit
Based off of [this boilerplate](https://github.com/essoen/express-api-boilerplate).
