# Examenopdracht Front-end Web Development & Web Services

- Student: NICOLAS NEIRYNCK
- Studentennummer: 201095919
- E-mailadres: nicolas.neirynck2@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)


## Front-end

## Opstarten

Installeer dependencies
 
 ```
pnpm install
 ```

Maak een .env bestand aan in de roots met volgende gegevens:
 
 ```
 VITE_API_URL='http://localhost:3000/api'
 ```
Voor development in terminal:
````
pnpm dev
````
Voor production in terminal:
````
pnpm build
````

## Testen

Zorg dat de back-end draait, database is geseed + front-end draait. Dan in terminal:

```
pnpm test
```

## Back-end

## Opstarten


Maak een .env bestand aan in de roots met volgende gegevens:

 ```
#GENERAL config
NODE_ENV=development
PORT=3000

#CORS config
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800

#Database config
DATABASE_URL=mysql://devusr:devpwd@localhost:3306/fridgepal

LOG_LEVELS=["log","error","warn","debug"]

#Auth config
AUTH_JWT_SECRET=eensuperveiligsecretvoorindevelopment

#Cloudinary config
CLOUDINARY_CLOUD_NAME=dyssxogz5
CLOUDINARY_API_KEY=954644388937983
CLOUDINARY_API_SECRET=Sny8QtB5EJz4hda9BNrkJ7rHPo4
CLOUDINARY_FOLDER=fridgepal-recipes
```

Maak een database aan met de naam die je in de .env file vindt.

In terminal:
````
pnpm install
pnpm db-migrate
pnpm db-seed
pnpm start:dev (development) of pnpm:start (production)
````

## Testen

Maak een .env.test bestand aan in de roots met volgende gegevens:

 ```
# General configuration
NODE_ENV=testing
PORT=3000

# CORS configuration
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800

# Auth configuration
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
AUTH_JWT_AUDIENCE=fridgepal.hogent.be
AUTH_JWT_ISSUER=fridgepal.hogent.be
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_MAX_DELAY=2000

# Logging configuration
LOG_DISABLED=true 
```

In terminal:
````
pnpm install
pnpm test:e2e

pnpm test:e2e:cov (coverage opvragen)
````
