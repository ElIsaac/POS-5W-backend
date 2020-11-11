const Producto = require("../models/Producto")
const Ticket = require("../models/Ticket")
const jwt = require('jwt-simple');

const { SECRET_KEY } = require('../services/secret-key');

async function cobrar(req, res) {
    const { productos } = req.body
    const lista = []
    const token = req.headers.authorization.replace(/['"]+/g, "")

    try {
        var payload = jwt.decode(token, SECRET_KEY)
        var pFinal = 0

        const aVer = await Promise.all(
            productos.map(async (p) => {
                const datosDelProducto = await Producto.findById(p.id)
                const datos = {
                    nombre: datosDelProducto.nombre,
                    precio: datosDelProducto.precio,
                    idProducto: datosDelProducto._id
                }
                pFinal += datosDelProducto.precio
                lista.push(datos)
            })
        );
        const ticket = new Ticket({
            productos: lista,
            precioFinal: pFinal,
            idCajero: payload.id,
            nombreCajero: payload.nombre + " " + payload.apellidos
        })
        await ticket.save()
        res.json({mensaje: "Ticket guardado correctamente"})
    } catch (error) {
        res.json({error: "Ha ocurrido un error en el servidor de tipo "+error})
    }
}

module.exports = {
    cobrar
}