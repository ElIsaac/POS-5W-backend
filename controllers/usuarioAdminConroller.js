/////////Peticion http "get" pra traer TODOS los productos///////
async function traerProductos(req, res){
    res.send("todos")
}

////////Peticion http "get" para traer UN SOLO producto/////////
async function traerProducto(req, res){
    res.send("Un solo producto")
}

async function nuevoProducto(req, res){
    const producto=req.body
    res.send(producto)
}

///////////Peticion http "put" para actuakizar productos////////
async function actualizarProducto(req, res){
    res.send("actualizar producto")
}

///////////Peticion http "delete" para eliminar un productos////////
async function borrarProducto(req, res){
    res.send("borrar un producto")
}

module.exports={
    actualizarProducto,
    borrarProducto,
    traerProducto,
    nuevoProducto,
    traerProductos,
}