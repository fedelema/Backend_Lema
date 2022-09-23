const { Router } = require('express');
const { webAuth } = require('../../auth/index.js');
const path = require('path');

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    //res.sendFile(__dirname + '/public/index.ejs')
    const nombre = req.session.nombre;
    res.render(path.resolve('public/index.ejs'), { nombre })
})

module.exports = productosWebRouter