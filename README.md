# Technical-Test

## 1. Simple Database Querying
[simple_database_querying.sql](https://github.com/fariqiahmad/technical-test/blob/master/simple_database_querying.sql)
## 2. Search Movies
[movies](https://github.com/fariqiahmad/technical-test/tree/master/movies)

The API can be accessed on [https://omdb-search-movie.herokuapp.com](https://omdb-search-movie.herokuapp.com/api/movies/search?title=spider&apiKey=628194e8)

### Running locally
Make sure you have [Node](https://nodejs.org/en/) and [MySQL](https://www.mysql.com/) installed.

```ssh
git clone git@github.com:fariqiahmad/technical-test.git # or clone your own fork
cd technical-test/movies/
npm install
sequelize db:migrate
nodemon
```
This app should now be running on [localhost:3000](http://127.0.0.1:3000).

### Running Unit Testing

```ssh
npm test
```

### Deploying on Heroku

This step assumes that you have a free [Heroku account](https://signup.heroku.com/dc) and already logged in with your account.

#### Deploy the app

```ssh
heroku create
git subtree push --prefix movies heroku master
```

#### Set up database and environment

Install The ClearDB add-on:
```ssh
heroku addons:create cleardb:ignite
```
Retrieve your database URL:
```ssh
heroku config | grep CLEARDB_DATABASE_URL
```
Set database vars. Copy the value of the CLEARDB_DATABASE_URL to config vars.
```ssh
heroku config:set DB_MYSQL_USERNAME
heroku config:set DB_MYSQL_PASSWORD
heroku config:set DB_MYSQL_DATABASE_NAME
heroku config:set DB_MYSQL_HOST
```
Running migration
```ssh
heroku run sequelize db:migrate
```
The application is now deployed and can be used.
```ssh
heroku open
```

## 3. Refactor The Code
[refactor_code.js](https://github.com/fariqiahmad/technical-test/blob/master/refactor_code.js)
## 4. Logic Test
[logic_test.js](https://github.com/fariqiahmad/technical-test/blob/master/logic_test.js)

