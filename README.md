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

Maak een .env bestand aan in de roots met volgende gegevens:
 
 ```
 VITE_API_URL='http://localhost:3000/api'
 ```
In terminal:
````
pnpm dev
````
## Testen

```
pnpm test
```

Check of de website draait op http://localhost:5137 en of de backend database seeding is gebeurd

## Back-end

## Opstarten


Maak een .env (development of een .env.test (testing) bestand aan in de roots met volgende gegevens:

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
#LOG_DISABLED=false -> ZET DIT UIT COMMENTAAR BIJ TESTING

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

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
