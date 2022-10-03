const { Router } = require('express');
const router = new Router();
const { fork } = require('child_process');

router.get("/", (req, res) => {
    let cant = parseInt(req.query.cant);
    let child = fork('./functions/arrayRandoms.js');
    child.send('start');
    child.on('message', (msg) => {
        res.end(msg);
    })
});

module.exports = router;