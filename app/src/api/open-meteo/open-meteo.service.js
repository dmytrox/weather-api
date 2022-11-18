const models = require('../../../../database/models');
const UnitEnum = require('../../../common/enums/units');

class OpenMeteoService {
    /**
     * Format and store data
     * @param {object} data 
     * @param {number} cityId 
     */
    async processData(data, cityId) {
        try {
            const weatherList = [];

            for (let index in data.hourly.time) {
                weatherList.push({
                    city_id: cityId,
                    datetime: data.hourly.time[index],
                    apparent_temperature: parseFloat(data.hourly.apparent_temperature[index]),
                    at_unit_id: UnitEnum.name[data.hourly_units.apparent_temperature],
                    rain: parseFloat(data.hourly.rain[index]),
                    rain_unit_id: UnitEnum.name[data.hourly_units.rain],
                    snowfall: parseFloat(data.hourly.snowfall[index]),
                    snowfall_unit_id: UnitEnum.name[data.hourly_units.snowfall],
                    visibility: parseInt(data.hourly.visibility[index]),
                    visibility_unit_id: UnitEnum.name[data.hourly_units.visibility],
                });
            }

            await models.Weather.bulkCreate(weatherList).catch(e => console.error(e));
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new OpenMeteoService();