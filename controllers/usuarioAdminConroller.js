const Producto = require("../models/Producto")

/////////Peticion http "get" pra traer TODOS los productos///////
async function traerProductos(req, res){
    try {
        const productos = await Producto.find()
        res.json(productos).status(200)
    } catch (error) {
        res.json({"error": "ha ocurrido in error en el servidor de tipo "+error})
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
            res.json({error: "El producto cone el id: "+idProducto+" no existe"})
        }
    } catch (error) {
        res.json({"error": "Error de servidor"+error})
    }
}

async function nuevoProducto(req, res){
    const { nombre/* , imagen */, precio }=req.body
    try {
        if( nombre==="" /* || imagen==="" */ || precio==="" ){
            return res.json({error: "Debe de llenar todos los campos"})
        }
        const nuevoProducto=new Producto({
            nombre,
             precio,
        })
        nuevoProducto.imagen = "Aun nop"
        await nuevoProducto.save()
        res.json(nuevoProducto).status(200)
    } catch (error) {
        res.json({"error": "ha ocurrido in error en el servidor de tipo "+error})
    }
}

///////////Peticion http "put" para actuakizar productos////////
async function actualizarProducto(req, res){
    const idProducto=req.params.id
    try {
        const producto = await Producto.findByIdAndUpdate(idProducto, req.body)
        if(producto){
            res.json({"mensaje": "producto actualizado"})
        }
        else{
            res.json({error: "El producto cone el id: "+idProducto+" no existe"})
        }
    } catch (error) {
        res.json({"error": "Error de servidor"+error})
    }
}

///////////Peticion http "delete" para eliminar un productos////////
async function borrarProducto(req, res){
    const idProducto=req.params.id
    try {
        const borrar = await Producto.findByIdAndDelete(idProducto)
        if(borrar){
            res.json({mensaje: "Producto eliminado correctamente"})
        }
        else{
            res.json({error: "El producto cone el id: "+idProducto+" no existe"})
        }
    } catch (error) {
        res.json({"error": "Error de servidor"+error})
    }
}

module.exports={
    actualizarProducto,
    borrarProducto,
    traerProducto,
    nuevoProducto,
    traerProductos,
}