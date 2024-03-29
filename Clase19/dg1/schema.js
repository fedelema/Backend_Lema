const { Schema, model } = require('mongoose');

const estudianteSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    dni: {type: String, required: true},
    curso: {type: String, required: true},
    nota: {type: Number, required: true}
}, {timestamps: true});

// El timestamps me crea 2 campos con fecha: createdAt (creacion) y updatedAt (ultima modificacion)

const Estudiante = model('estudiante', estudianteSchema);

module.exports = {
    estudianteSchema,
    Estudiante
}