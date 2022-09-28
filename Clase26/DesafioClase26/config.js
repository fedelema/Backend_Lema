const PORT = process.env.PORT || 8080;
const mongoLocal = {
    client: 'mongodb',
    cnxStr: 'mongodb://localhost:27017/sessions26'
};
const mongoRemote = {
    client: 'mongodb',
    cnxStr: 'mongodb+srv://fedelema:Fedito123@cluster0.e1fwhof.mongodb.net/test'
};

module.exports = {
    PORT,
    mongoLocal,
    mongoRemote
}