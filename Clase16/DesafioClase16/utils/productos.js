const fs = require("fs");
const encoding = "utf-8"

class Producto {
    constructor(path) {
        this.filePath = path;
        const data = fs.readFileSync(this.filePath, encoding);
        this.producto = JSON.parse(data);
    }

    _saveAll (data) {
        const stringData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, stringData ,encoding)
    }
    
    save(object) {
        const lastId = this.producto.reduce(
            (acc, el) => { // Funcion a evaluar para ir comparando el mayor de los ids
            return el.id > acc ? el.id : acc 
            }, 
            0 // Acumulador inicial
        );
        const newId = lastId + 1;
        object.id = newId;
        this.producto.push(object);
        this._saveAll(this.producto)
        return newId;
    }
    
    getById (id) {
        return this.producto.find(c => c.id === id);
    }
    
    getAll() {
        return this.producto;
    }
    
    deleteById(id) {
        const filtered = this.producto.filter(el => el.id !== id);
        this.producto = filtered;
        this._saveAll(filtered);
    }
    
    deleteAll() {
        this.producto = [];
        this._saveAll([]);
    }
    
    updateById(id, object) {
        const index = this.producto.findIndex(el => el.id === id);
        this.producto[index] = object;
        this._saveAll(this.producto);
    }
}

module.exports = Producto // COMMONJS