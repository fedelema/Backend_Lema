const { Router } = require('express');
const session = require('express-session');
const authWebRouter = new Router()
const path = require('path');

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.resolve('public/login.html'))
    }
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.resolve('public/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombreLogin;
    const nombre = req.session.nombre;
    res.redirect('/home')
})

module.exports = authWebRouter