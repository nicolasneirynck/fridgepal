# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

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


Maak een .env bestand aan in de roots met volgende gegevens:

 ```
 NODE_ENV=development
 PORT=3000
 CORS_ORIGINS=["http://localhost:5173"]
 CORS_MAX_AGE=10800
```
In terminal:
````
pnpm install
pnpm db-migrate
pnpm db-seed
pnpm start:dev
````

## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
