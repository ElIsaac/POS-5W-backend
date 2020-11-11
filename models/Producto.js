const { Schema, model } = require("mongoose")


const ProductoSchema = new Schema({
    nombre: {
       type: String, 
       required: true 
    },
    precio: { 
      type: Number, 
      required: true 
    },
    imagen: {
       type: String, 
       required: true 
    },
    fecha: { 
      type: Date, 
      default: Date.now 
    }
  });

module.exports= model("Producto", ProductoSchema)