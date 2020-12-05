const Producto = require("../models/Producto")
const Usuario=require("../models/Usuario")
const Ticket = require("../models/Ticket")
const { encriptar } = require("../services/criptografia")

async function actualizarUsuario(req, res){
    const { nombre, apellidos, email, contrasenia, confirmaContrasenia }=req.body
    try {
        if(contrasenia!==""&&confirmaContrasenia!==""){
            if(contrasenia.length > 4 && confirmaContrasenia===""){
                res.json({error: "debe de llenar los dos campos de contraseña"})
            }
            else if(contrasenia!==confirmaContrasenia){
                res.json({"error":"Las contraseñas no coinciden"}).status(400)
            }
            else if(contrasenia.length <= 4){
                res.json({"error":"la contraseña debe de ser mayor a 4 caracteres"}).status(400)
            }else{
                const datos=req.body
                datos.contrasenia = await encriptar(contrasenia)
                const editado=await Usuario.findByIdAndUpdate(req.params.id, datos)
                if(editado){
                    res.json({"mensaje": "usuario guardado"}).status(200)
                }else{
                    res.json({error:"Usuario no encontrado"})
                }
            }
        }else{
            console.log(req.body)
            const datos={
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
                admin: req.body.admin,
            }
            
            const editado=await Usuario.findByIdAndUpdate(req.params.id, datos)
            if(editado){
                res.json({"mensaje": "usuario guardado"}).status(200)
            }else{
                res.json({error:"Usuario no encontrado"})
            }
        }
            
        
    } catch (error) {
        
        if(error.code === 11000){
            res.json({"error": `El email '${email}' ya esta en usar uno diferente`} ).status(500)
        }
        else{
            console.log(error)
            res.json( {"error": "ha ocurrido un error en el servidor "+error} ).status(500)
        }
    }
}

async function eliminarUsuario(req, res){
    const id=req.params.id
    try {
        
            const eliminar=await Usuario.findByIdAndDelete(id)
            if(eliminar){
                res.json({"mensaje": "usuario eliminado"}).status(200)
            }else{
                res.json({error:"Usuario no encontrado"})
            }
        
    } catch (error) {
        
            console.log(error)
            res.json( {"error": "ha ocurrido un error en el servidor "+error} ).status(500)
        
    }
}

/////////Peticion http "get" pra traer TODOS los productos///////

async function nuevoProducto(req, res){
    const { nombre/* , imagen */, precio }=req.body
    try {
        if( nombre==="" /* || imagen==="" */ || precio==="" || !nombre || !precio){
            return res.json({error: "Debe de llenar todos los campos"})
        }
        const nuevoProducto=new Producto({
            nombre,
             precio,
        })
        nuevoProducto.imagen = "Aun nop"
        await nuevoProducto.save()
        res.json({"mensaje": "Producto agregado correctamente"}).status(200)
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


async function traerTickets(req, res){
    const idCajero=req.params.idCajero
    try {
        const tickets=await Ticket.find()
        if(tickets.length >= 1){
            res.json(tickets).status(200)
        }else{
            res.json({error: "no hay tickets disponibles"}).status(404)
        }
    } catch (error) {
        res.json({error: "ha ocurrrido un error en el servidor. "+error}).status(500)
    }
}

async function traerUsuarios(req,res){
    try {
        const usuarios=await Usuario.find({}, ['_id', 'nombre', 'apellidos', 'email', 'admin', 'avatar'])
        if(usuarios.length >= 1){
            res.json(usuarios).status(200)
        }else{
            res.json({error: "no hay usuarios disponibles"}).status(404)
        }
    } catch (error) {
        res.json({error: "ha ocurrrido un error en el servidor. "+error}).status(500)
    }
}





module.exports={
    actualizarProducto,
    borrarProducto,
    nuevoProducto, 
    actualizarUsuario, 
    traerTickets,
    traerUsuarios,
    eliminarUsuario,
    
}