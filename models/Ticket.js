const { Schema, model } = require("mongoose")


const TicketSchema = new Schema({
    productos: {
       type: Array, 
       required: true 
    },
    precioFinal: { 
      type: Number, 
      required: true 
    },
    idCajero: {
        type: String, 
        required: true 
     },
    nombreCajero: {
       type: String, 
       required: true 
    },
    fecha: { 
      type: Date, 
      default: Date.now 
    }
  });

module.exports= model("Ticket", TicketSchema)