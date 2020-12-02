const Producto = require("../models/Producto")
const Ticket = require("../models/Ticket")
const jwt = require('../services/jwt');
const pdf = require('html-pdf');
const path = require("path")

const nuevoRecibo =require("../pdfs/templates/recibo")

const { SECRET_KEY } = require('../services/secret-key');

async function cobrar(req, res) {
    const { productos } = req.body
    const lista = []
    const token = req.headers.authorization.replace(/['"]+/g, "")

    try {
        var payload = jwt.decodeToken(token, SECRET_KEY)
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
        pdf.create(nuevoRecibo(ticket), {}).toFile(path.join(__dirname, "..")+'/pdfs/'+ticket._id+'.pdf', (err) => {
        if(err) {
            res.json({error: "Ha ocurrido un error en el servidor de tipo "+err})
        }else{
            res.sendFile(path.join(__dirname, "..")+'/pdfs/'+ticket._id+'.pdf')
        }
    });

    
    } catch (error) {
        res.json({error: "Ha ocurrido un error en el servidor de tipo "+error})
    }
}

////////Peticion http "get" para traer UN SOLO producto/////////
async function traerProducto(req, res){
    const idProducto=req.params.id
    try {
        const producto = await Producto.findById(idProducto)
        if(producto){
            res.json(producto)
        }
        else{
            res.json({error: "El producto con el id: "+idProducto+" no existe"})
        }
    } catch (error) {
        if(error.name==="CastError"){
            res.json({error: "El id: "+idProducto+" tiene caracteres faltantes o sobrantes, favor de verificarlo"})
        }else{

            res.json({"error": "Error de servidor"+error})

        }
    }
}

async function traerProductos(req, res){
    try {
        const productos = await Producto.find()
        res.json(productos).status(200)
    } catch (error) {
        res.json({"error": "ha ocurrido in error en el servidor de tipo "+error})
    }
}

async function traerTickets(req, res){
    try {
        const tickets=await Ticket.find()
        if(tickets){
            res.json(tickets).status(200)
        }else{
            res.json({error: "no hay tickets disponibles"}).status(404)
        }
    } catch (error) {
        res.json({error: "ha ocurrrido un error en el servidor. "+error}).status(500)
    }
}

async function mandarPdfTicket(req, res){
    const {id}=req.params
    try {
        const ticket=await Ticket.findById(id)
        if(ticket){
            res.sendFile(path.join(__dirname, "..")+'/pdfs/'+ticket._id+'.pdf')
            
        }else{
            res.json({error: "El ticket que busca no existe"}).status(404)
        }
    } catch (error) {
        console.log(error.name)
        switch (error.name) {
            case 'CastError':
                res.json({error: "Su id esta incompleto o le sobran caracteres, favor de verificarlo"}).status(404)
                break;
        
            default:
                res.json({error: "ha ocurrrido un error en el servidor. "+error}).status(500)
                break;
        }
        
    }
}

module.exports = {
    cobrar, 
    traerProducto,
    traerProductos,
    mandarPdfTicket,
    traerTickets
}