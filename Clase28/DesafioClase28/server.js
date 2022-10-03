const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./config.js');
const app = express();
const { Router } = require('express');
const router = new Router();
const User = require('./user.schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword, hashPassword } = require('./utils/password');
const { mongoose, Types } = require('mongoose');
const path = require('path');
const { authMiddleware } = require('./auth/index');

const connect = async () => {
    await mongoose.connect(config.mongoLocal.cnxStr);
};
connect();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routerMensajes = require('./routes/mensajes');
const routerProductos = require('./routes/productos');
//const routerSession = require('./routes/user');
const routerInfo = require('./routes/info');
const routerRandoms = require('./routes/randoms');

const { Server: HTTPServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const events = require('./socket_events');
const Contenedor = require('./utils/contenedor');
const Producto = require('./utils/productos');
const contenedor = new Contenedor('./data.json');
const productos = new Producto('./botellas.txt');

passport.use("login", new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    const passHash = user.password;
    if (!user || !comparePassword(password, passHash)) {
        return done(null, null, { message: "Invalid username or password" });
    }
    return done(null, user);
}));

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
    }, async (req, username, password, done) => {
    const user = await User.findOne({ username });
    if (user) {
        return done(new Error("User already exists."), null);
    }
    const hashedPassword = hashPassword(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
});

app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongoLocal.cnxStr,
        retries: 0,
        ttl: 60 * 60 * 24
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos', routerProductos);
app.use('/api/mensajes', routerMensajes);
//app.use('/', routerSession);
app.use('/info', routerInfo);
app.use('/api/randoms', routerRandoms);

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/signup",
    }) , (req, res) => {  
        req.session.user = req.user;
        res.redirect("/home");
    }
);

app.post("/login", passport.authenticate("login", {
    failureRedirect: "/login",
    }) ,(req, res) => {
        req.session.user = req.user;
        res.redirect('/home');
    }
);

app.get("/login", (req, res) => {
    res.sendFile(path.resolve('public/login.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.resolve('public/signup.html'));
});

app.get("/home", authMiddleware, (req, res) => {
    res.render(path.resolve('public/index.ejs'), { user: req.session.user });
});

app.get("/logout", (req, res) => {
    const user = req.session.user;
    req.session.destroy();
    res.render(path.resolve('public/logout.ejs'), { user });
});

const {normalize, schema, denormalize} = require("normalizr");
const fs = require("fs");
const data = require("./data.json");
const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'id'});
const textSchema = new schema.Entity('texts', {
    author: authorSchema
}, {idAttribute: '_id'});
const normalizedData = normalize(data, [textSchema]);
const denormalizedData = denormalize(normalizedData.result, [textSchema], normalizedData.entities);

try {
    fs.writeFileSync('./data-normalized.json', JSON.stringify(normalizedData, null, 2), "utf-8")
} catch (err) {
    console.log(err)
}

try {
    fs.writeFileSync("./data.json", JSON.stringify(denormalizedData, null, 2), "utf-8")
} catch (err) {
    console.log(err)
}

const compresionFormula = (((JSON.stringify(data).length / 1024) - (JSON.stringify(normalizedData).length / 1024)) / (JSON.stringify(data).length / 1024)) * 100;
const compresion = compresionFormula.toFixed(2);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socketServer.emit(
        events.UPDATE_MESSAGES,
        'Bienvenidos al WebSocket',
        contenedor.getAll()
    );

    socket.emit(events.PRODUCTOS_CARGADOS, productos.getAll());

    socket.emit('COMPRESION', compresion);

    socket.on(events.NUEVO_PRODUCTO, (prod) => {
        productos.save(prod);
        socketServer.emit(events.PRODUCTOS_CARGADOS, productos.getAll());
    });

    socket.on(events.POST_MESSAGE, (msg) => {
        contenedor.save(msg);
        socketServer.sockets.emit(events.NEW_MESSAGE, msg);
    });
});

const PORT = config.args.port;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));