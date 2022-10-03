const { Router } = require('express');
const router = new Router();
const config = require('../config');

router.get("/", (req, res) => {
    res.send({
        'Argumentos de entrada': config.args,
        'Nombre de la plataforma': process.platform,
        'Version de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecucion': process.title,
        'Process id': process.pid,
        'Carpeta del proyeto': process.cwd()
    })
});

module.exports = router;