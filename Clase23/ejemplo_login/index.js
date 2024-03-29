const express = require("express");
const app = express();
const port = 8001;
const session = require("express-session");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
  secret: "coderhouse",
  resave: true,
  saveUninitialized: true,
}));

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Dashboard route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "pepe" && password === "1234") {
    req.session.user = email;
    res.json({ status: "ok" });
    return
  }
  res.status(401).send("Invalid credentials");
});

app.get("/api/dashboard", (req, res) => {
  if (req.session.user) {
    res.json({ status: "ok", user: req.session.user});
    return
  }
  res.status(401).send({error: "Unauthorized"});
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ status: "ok" });
})



app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});