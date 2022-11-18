const http = require("http");

class ApiInterface {
    /**
     * @param {number} cityId 
     * @param {object} options 
     */
    constructor(cityId, options) {
        this.cityId = cityId;
        this.options = options;
    }

    /**
     * Fetch data from provided link and process them
     * @param {function} processFunc 
     */
    async fetch(processFunc) {
        try {
            http.get(this.options, (res) => {
                res.setEncoding('utf8');

                let rawData = '';

                res.on('data', (chunk) => { rawData += chunk; });

                res.on('end', async () => {
                    try {
                        await processFunc(JSON.parse(rawData), this.cityId);
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
            });
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = ApiInterface;