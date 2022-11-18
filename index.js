const express = require('express');

const app = express();
const cors = require('cors');
const helmet = require('helmet');

const db = require('./database/models');

require('dotenv').config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet());

app.use('/api/city', require('./routes/city.routes'));

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    try {
        await db.sequelize.authenticate();
        console.log('Connection with DB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});