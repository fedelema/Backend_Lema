const mongoose = require('mongoose');
const { model } = require('mongoose');
const config = require('../../config');

async function main() {
    const URIString = config.uriString;
    await mongoose.connect(URIString);
}
main();

class ContenedorMongoDB {
    constructor(_coll, _schema) {
        this.model = model(_coll, _schema);
    }
    
    async save(object) {
        const doc = new this.model(object);
        const result = await doc.save();

        console.log(result);
        return result;
    }

    async getById (id) {
        const doc = await this.model.findOne({_id: id});
        
        console.log(doc);
        return doc;
    }

    async getAll() {
        const docs = await this.model.find();

        console.log(docs);
        return docs;
    }

    async deleteById(id) {
        const result = await this.model.deleteOne({id: id});

        console.log(result);
        return result;
    }

    async deleteAll() {
        await this.model.deleteMany();
    }

    async updateById(id, object) {
        const doc = await this.model.findOne({_id: id});
        doc = object;
        const result = await doc.save();

        console.log(result);
        return result;
    }
}

module.exports = ContenedorMongoDB