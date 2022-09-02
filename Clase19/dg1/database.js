const mongoose = require('mongoose');

async function main() {
    const URIString = 'mongodb://localhost:27017/colegio';
    await mongoose.connect(URIString);
}

module.exports = main;