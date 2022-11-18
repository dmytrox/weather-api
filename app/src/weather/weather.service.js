const { Sequelize, Op } = require("sequelize");
const { Weather } = require("../../../database/models");

class WeatherService {
    /**
     * Calc average tempature for city for provided date
     * @param {number} cityId 
     * @param {string} date e.g. "2022-11-10"
     * @returns 
     */
    async getAvgTemperatureInCity(cityId, date) {
        try {
            const { apparent_temperature } = await Weather.findAll({
                where: {
                    city_id: cityId,
                    datetime: {
                        [Op.startsWith]: date
                    }
                },
                attributes: [[Sequelize.fn('AVG', Sequelize.col('apparent_temperature')), 'apparent_temperature']],
                plain: true
            });

            return {
                avgTemp: apparent_temperature.toFixed(2)
            };
        } catch (error) {
            console.error(error);
        }
    } 
}

module.exports = new WeatherService();