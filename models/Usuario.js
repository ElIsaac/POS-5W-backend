const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

/////////////////modelo de datos que se guardaran en mongodb///////
const UsuarioSchema = new Schema({
  nombre: {
     type: String, 
     required: true 
  },
  apellidos: {
    type: String, 
    required: true 
 },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  admin: {
    type: Boolean, 
    required: true 
 },
  contrasenia: {
     type: String, 
     required: true 
  },
  avatar: {
    type: String, 
    required: false 
 },
  fecha: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = model("Usuario", UsuarioSchema);