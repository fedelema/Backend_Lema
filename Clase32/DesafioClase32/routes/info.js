const { Router, application } = require('express');
const router = new Router();
const config = require('../config');
const compression = require('compression');
const gzipMiddleware = compression();

/* const stringInfo = `'Argumentos de entrada': ${config.args},
'Nombre de la plataforma': ${process.platform},
'Version de node.js': ${process.version},
'Memoria total reservada (rss)': ${process.memoryUsage().rss},
'Path de ejecucion': ${process.title},
'Process id': ${process.pid},
'Carpeta del proyeto': ${process.cwd()}`; */

router.get("/info-sin-cl", (req, res) => {
    const objInfo = {
        'Argumentos de entrada': config.args,
        'Nombre de la plataforma': process.platform,
        'Version de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecucion': process.title,
        'Process id': process.pid,
        'Carpeta del proyeto': process.cwd()
    };
    res.send(objInfo)
});

router.get("/info-con-cl", (req, res) => {
    const objInfo = {
        'Argumentos de entrada': config.args,
        'Nombre de la plataforma': process.platform,
        'Version de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecucion': process.title,
        'Process id': process.pid,
        'Carpeta del proyeto': process.cwd()
    };
    console.log(objInfo);
    res.send(objInfo)
});

router.get("/infogzip", gzipMiddleware, (req, res) => {
    const objInfo = {
        'Argumentos de entrada': config.args,
        'Nombre de la plataforma': process.platform,
        'Version de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecucion': process.title,
        'Process id': process.pid,
        'Carpeta del proyeto': process.cwd()
    };
    res.send(objInfo)
});

module.exports = router;