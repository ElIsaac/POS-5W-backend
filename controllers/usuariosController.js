///////////Peticion http "Post" para iniciar sesion////////
async function iniciar(req, res){
    res.send("actualizar producto")
}

///////////Peticion http "Post" para registrar usuarios////////
async function registrar(req, res){
    res.send("borrar un producto")
}

module.exports={
    registrar,
    iniciar,
}