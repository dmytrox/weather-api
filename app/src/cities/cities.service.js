const { Cities, Weather } = require("../../../database/models");
const { Op } = require("sequelize");
const UnitsEnum = require("../../common/enums/units.enum");

class CitiesService {
    /**
     * Get all cities
     * @param {[string]} attributes
     * @returns {promise<object>}
     */
    async getAll(attributes) {
        try {
            return await Cities.findAll({
                attributes
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Get city weather
     * @param {number} cityId 
     * @returns {promise<object>}
     */
    async getCityWeather(cityId, date) {
        try {
            const city = await Cities.findOne({
                attributes: [
                    'id',
                    'name',
                    'views_count'
                ],
                include: [{
                    model: Weather,
                    as: 'weather',
                    attributes: [
                        'datetime',
                        ['apparent_temperature', 'apparentTemperature'],
                        'at_unit_id',
                        'rain',
                        'rain_unit_id',
                        'snowfall',
                        'snowfall_unit_id',
                        'visibility',
                        'visibility_unit_id'
                    ],
                    where: {
                        datetime: {
                            [Op.startsWith]: date
                        }
                    }
                }],
                where: {
                    id: cityId
                }
            });

            city.views_count++;
            
            await city.save();
            
            /** Looks bad btw */
            const weather = city.dataValues.weather.map(item => {
                return {
                    datetime: item.datetime,
                    apparentTemperature: {
                        value: item.dataValues.apparentTemperature,
                        unit: UnitsEnum.id[item.at_unit_id]
                    },
                    rain: {
                        value: item.rain,
                        unit: UnitsEnum.id[item.rain_unit_id]
                    },
                    snowfall: {
                        value: item.snowfall,
                        unit: UnitsEnum.id[item.snowfall_unit_id]
                    },
                    visibility: {
                        value: item.visibility,
                        unit: UnitsEnum.id[item.visibility_unit_id]
                    }
                };
            });

            delete city.dataValues.weather;

            delete city.dataValues.updatedAt;

            city.dataValues.viewsCount = city.dataValues.views_count;

            delete city.dataValues.views_count;
            /** ------ */

            return {...city.dataValues, weather};
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Get most view city
     * @returns {promise<object>}
     */
    async getMostViewedCity() {
        try {
            return await Cities.findOne({
                attributes: ['id', 'name', ['views_count', 'viewsCount']],
                order: [
                    ['views_count', 'DESC'],
                ],
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Check if city with such id is exists
     * @param {number} cityId 
     * @returns {promise<object>}
     */
    async cityExist(cityId) {
        try {
            const city = await Cities.findOne({
                where: {
                    id: cityId
                }
            });

            return city;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new CitiesService();