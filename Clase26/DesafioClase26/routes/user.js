const { Router } = require('express');
const router = new Router();
const User = require('../user.schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword, hashPassword } = require('../utils/password');
const { Types } = require('mongoose');
const path = require('path');
const { authMiddleware } = require('../auth/index');

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

router.get("/", (req, res) => {
    res.redirect("/home");
});

router.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/signup",
    }) , (req, res) => {  
        req.session.user = req.user;
        res.redirect("/home");
    }
);

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/login",
    }) ,(req, res) => {
        req.session.user = req.user;
        res.redirect('/home');
    }
);

router.get("/login", (req, res) => {
    res.sendFile(path.resolve('public/login.html'));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.resolve('public/signup.html'));
});

router.get("/home", authMiddleware, (req, res) => {
    res.render(path.resolve('public/index.ejs'), { user: req.session.user });
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.render(path.resolve('public/logout.ejs'), { user: req.session.user, email: req.session.user.email });
});

module.exports = router;