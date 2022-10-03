// dotenv
const dotenv = require('dotenv');
dotenv.config();

const mongoLocal = {
    client: 'mongodb',
    cnxStr: process.env.MONGO_LOCAL_CNXSTR || 'mongodb://localhost:27017/sessions26'
};
const mongoRemote = {
    client: 'mongodb',
    cnxStr: process.env.MONGO_REMOTE_CNXSTR || 'mongodb+srv://fedelema:Fedito123@cluster0.e1fwhof.mongodb.net/test'
};

//yargs
const yargs = require('yargs');
const args = yargs(process.argv.slice(2))
    .alias({
        p: 'port'
    })
    .default({
        port: 8080
    })
    .argv

delete args._
delete args.$0

module.exports = {
    mongoLocal,
    mongoRemote,
    args
}