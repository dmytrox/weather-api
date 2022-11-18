const CitiesService = require("./cities.service");
const WeatherService = require("../weather/weather.service");
const validator = require("../../common/validator");

const {
    SUCCESS,
    SERVER_ERROR,
    BAD_REQUEST
} = require('../../common/response');

class CitiesController {
    /**
     * Get all cities 
     * @method GET
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    async getAll(req, res) {
        try {
            return res.status(SUCCESS.code).json({
                ...SUCCESS.body,
                data: await CitiesService.getAll([
                    'id',
                    'name',
                    ['views_count', 'viewsCount']
                ])
            });
        } catch (error) {
            console.error(error);
            return res.status(SERVER_ERROR.code).json(SERVER_ERROR.body);
        }
    }

    /**
     * Get city weather
     * @method GET
     * @param {*} req 
     * @param {*} res 
     * @returns {*}
     */
    async getCityWeather(req, res) {
        try {
            const { cityId, date } = req.query;

            if (!cityId || !await CitiesService.cityExist(cityId)) {
                return res.status(BAD_REQUEST.code).json({
                    ...BAD_REQUEST.body,
                    message: "cityId query parameter is missing or wrong"
                })
            }

            if (!date || !validator.date(date)) {
                return res.status(BAD_REQUEST.code).json({
                    ...BAD_REQUEST.body,
                    message: "date query parameter is missing ot not valid"
                });
            }

            return res.status(SUCCESS.code).json({
                ...SUCCESS.body,
                data: await CitiesService.getCityWeather(cityId, date)
            });
        } catch (error) {
            console.error(error);
            return res.status(SERVER_ERROR.code).json(SERVER_ERROR.body);
        }
    }

    /**
     * Get average temperature in city by date
     * @method GET
     * @param {*} req 
     * @param {*} res 
     * @returns {*}
     */
    async getCityAvgTemperature(req, res) {
        try {
            let { cityId, date } = req.query;

            if (!cityId || !await CitiesService.cityExist(cityId)) {
                return res.status(BAD_REQUEST.code).json({
                    ...BAD_REQUEST.body,
                    message: "cityId query parameter is missing or wrong"
                });
            }

            if (!date ) {
                // Get current date
                date = new Date().toISOString().substring(0, 10);               
            } else if (!validator.date(date)) {
                return res.status(BAD_REQUEST.code).json({
                    ...BAD_REQUEST.body,
                    message: "date query parameter is not valid"
                });
            }

            return res.status(SUCCESS.code).json({
                ...SUCCESS.body,
                data: await WeatherService.getAvgTemperatureInCity(cityId, date)
            });
        } catch (error) {
            console.log(error);
            return res.status(SERVER_ERROR.code).json(SERVER_ERROR.body);
        }
    }

    /**
     * Get most viewed city
     * @method GET
     * @param {*} req 
     * @param {*} res 
     * @returns {*}
     */
    async getMostViewedCity(req, res) {
        try {
            const data = await CitiesService.getMostViewedCity();

            if (!data) return res.status(SERVER_ERROR.code).json(SERVER_ERROR.body);

            return res.status(SUCCESS.code).json({
                ...SUCCESS.body,
                data
            });
        } catch (error) {
            console.error(error);
            return res.status(SERVER_ERROR.code).json(SERVER_ERROR.body);
        }
    }
}

module.exports = new CitiesController();