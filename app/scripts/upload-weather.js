require('dotenv').config();

const apiUrl = process.env.OPEN_METEO_API_URL;

const ApiInterface = require("../src/api/api.interface");

const OpenMeteoService = require("../src/api/open-meteo/open-meteo.service");
const CitiesService = require("../src/cities/cities.service");

(async () => {
    const cities = await CitiesService.getAll(['id', 'lat', 'long']);

    for (let { id, lat, long } of cities) {
        const options = {
            host: apiUrl,
            path: `/v1/forecast?latitude=${lat}&longitude=${long}&hourly=apparent_temperature,rain,snowfall,visibility&current_weather=true&past_days=7`,
        };

        await new ApiInterface(id, options).fetch(OpenMeteoService.processData);
    }
})();