const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const port = 8081;

app.use(cors());

app.get('/getFiles', async (req, res) => {
    const site = req.query.site;
    try {
        const response = await axios.get(site);
        const $ = cheerio.load(response.data);
        const cssFiles = $('link[rel="stylesheet"]').map((i, elem) => $(elem).attr('href')).get();
        const jsFiles = $('script[src]').map((i, elem) => $(elem).attr('src')).get();
        const files = { css: cssFiles, js: jsFiles };
        res.send(files);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
