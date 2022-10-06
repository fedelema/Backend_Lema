const { Router } = require('express');
const router = new Router();
const { fork } = require('child_process');

router.get("/", (req, res) => {
    let cant = req.query.cant || 100000000;
    let child = fork('./functions/arrayRandoms.js');
    child.send(cant);
    child.on('message', (msg) => {
        res.end(msg);
    })
});

module.exports = router;