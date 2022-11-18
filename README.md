# Weather API

> Postman collection stored under utils dir

Used stack:

- Express.js - Node.js RESTAPI platform
- MySQL - Database 
- Sequelize - MySQL db ORM

Used open source API/Data:
- [Open Meteo](https://open-meteo.com/en/docs#latitude=47.01&longitude=32.10&hourly=temperature_2m) - Weather API
- [Simple Maps](https://simplemaps.com/data/us-cities) - cities list with coordinates

Commands to run app:
```
npm i 

# Before running this commands clone .example.env > .env and put your data into it
npx sequelize db:migrate
npx sequelize db:seed:all

# Or import db dump from utils dir

# Scripts for import data from API and csv file
npm run upload-cities
npm run upload-weather

npm run start
```
