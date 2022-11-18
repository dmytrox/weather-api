require('dotenv').config();

const fs = require('fs');
const csv = require('@fast-csv/parse');
const models = require("../../database/models");

const uriFile = process.env.CITIES_FILE_PATH;

const citiesList = []

fs.createReadStream(uriFile)
    .pipe(csv.parse())
    .on('error', error => console.error(error))
    .on('data', row => {
        const city = row[0].split(";");
        
        citiesList.push({
            name: city[0],
            lat: parseFloat(city[1]),
            long: parseFloat(city[2])
        });    
    })
    .on('end', async () => {
        await models.Cities.bulkCreate(citiesList).catch(e => console.log(e));
    });
