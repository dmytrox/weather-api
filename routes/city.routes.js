const router = require('express').Router();

const citiesController = require('../app/src/cities/cities.controller');

router.get('/all', citiesController.getAll);
router.get('/weather', citiesController.getCityWeather);
router.get('/weather/avg-temperature', citiesController.getCityAvgTemperature);
router.get('/popular', citiesController.getMostViewedCity);

module.exports = router;