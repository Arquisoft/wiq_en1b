# wiq_en1b

[![Deploy on release](https://github.com/Arquisoft/wiq_en1b/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en1b/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en1b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en1b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en1b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en1b)

This is a base repo for the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html). 


This repo is a basic application composed of several components.

- **Gateway service**. Express service that is exposed to the public and serves as a proxy to the two previous ones.
- **User service**. Express service that handles the insertion of new users in the system.
- **Auth service**. Express service that handles the authentication of users.
- **Webapp**. React web application that uses the gateway service to allow basic login and new user features.

Both the user and auth service share a Mongo database that is accessed with mongoose.

## Quick start guide
In order to deployed it locally you can check out the docker configuration below:

### Using docker

The fastest way for launching this sample project is using docker. Just clone the project:

```sh
git clone https://github.com/Arquisoft/wiq_en1b.git
```

and launch it with docker compose:

```sh
docker compose --profile dev up --build
```

### Deployed in Cloud
In order to view the application deploy in the cloud click [here](http://wiqen1b.serveminecraft.net:3000)
### Members

- Lucía Ruiz Núñez uo289267@uniovi.es
- Mario Junquera Rojas uo287557@uniovi.es
- Jorge Cano Martinez uo289845@uniovi.es
- Laura Gómez Menéndez uo275725@uniovi.es
- Ahmet Erdem Yabaci uo303561@uniovi.es
- Daniel Sinne Argüelles uo282500@uniovi.es
