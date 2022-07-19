// Express y Multer
const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Almacenamiento con Multer
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
});
let upload = multer({storage: storage});

// Ver archivos almacenados
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Subir archivos (uno o varios)
app.post('/uploadfile', upload.single('file1'), (req, res, next) => {
    const file = req.file;
    if(!file) {
        const error = new Error('Por favor, cargue un archivo');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

app.post('/uploadmultiplefiles', upload.array('multiplefiles1', 12), (req, res, next) => {
    const files = req.files;
    if(!files) {
        const error = new Error('Por favor, cargue uno o más archivos');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(files);
});

// Server y manejo de errores
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));