const dotenv = require("dotenv");
dotenv.config();

const DB = process.env.PERS || "json"
const uriString = process.env.MONGO_URI_STRING || "mongodb://localhost:27017/test";

module.exports = {
    DB,
    uriString
}