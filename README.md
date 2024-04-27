# wiq_en1b

[![Deploy on release](https://github.com/Arquisoft/wiq_en1b/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en1b/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en1b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en1b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en1b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en1b)

<b>To access the game simply follow the link [here](http://wiqen1b.serveminecraft.net)</b><br>
The documentation of the system can be found [here](https://arquisoft.github.io/wiq_en1b/)<br>
And the API documentation can be seen [here](http://wiqen1b.serveminecraft.net:8000/api-doc/)<br>

![wiq-icon-improved](https://github.com/Arquisoft/wiq_en1b/assets/124193979/cfa27b39-d039-4502-9299-da424cd04151)

## Application components

This repo is an application made from several components.

- **Gateway service**. Express service that is exposed to the public and serves as a proxy to the two previous ones.
- **User service**. Express service that handles the insertion of new users in the system.
- **Auth service**. Express service that handles the authentication of users.
- **Record service**. Express service that handles the game results of all the users and shows a ranking.
- **Webapp**. React web application that uses the gateway service to allow users to play the game, in addition to registering, logging in, view the ranking and much more.
- **Question generator**. Java application that generates questions from Wikidata which are later used in the game.
- **Question service**. Express service that handles the database (MongoDB) and retrieves the previously generated question to be used in the game.

Both the <i>User service</i> and <i>Auth service</i> share a Mongo database that is accessed with mongoose. The <i>Question generator</i> and <i>Question service</i> also share a MongoDB connection.

## Quick start guide
In order to deployed it locally you can check out the docker configuration below:

### Using docker

If you want to try it out by yourself, the fastest way for launching this project is using docker. Just clone the project:

```sh
git clone https://github.com/Arquisoft/wiq_en1b.git
```

and launch it with docker compose:

```sh
docker compose --profile dev up --build
```

## Members

The members of the great team that made this incredible application.

- Lucía Ruiz Núñez uo289267@uniovi.es
- Mario Junquera Rojas uo287557@uniovi.es
- Jorge Cano Martinez uo289845@uniovi.es
- Laura Gómez Menéndez uo275725@uniovi.es
- Ahmet Erdem Yabaci uo303561@uniovi.es
- Daniel Sinne Argüelles uo282500@uniovi.es
