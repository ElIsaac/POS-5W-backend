const Producto = require("../models/Producto")
const Usuario=require("../models/Usuario")
const { encriptar } = require("../services/criptografia")

async function actualizarUsuario(req, res){
    const { nombre, apellidos, email, contrasenia, confirmaContrasenia }=req.body
    try {
        if(contrasenia){
            if(!confirmaContrasenia){
                res.json({error: "debe de llenar los dos campos de contraseña"})
            }
            else if(contrasenia!==confirmaContrasenia){
                res.json({"error":"Las contraseñas no coinciden"}).status(400)
            }
            else if(contrasenia.length <= 4){
                res.json({"error":"la contraseña debe de ser mayor a 4 caracteres"}).status(400)
            }
        }
        
            console.log(req.body)
            const datos=req.body
            if(contrasenia){
                datos.contrasenia = await encriptar(contrasenia)
                console.log(datos.contrasenia)
            }
            const editado=await Usuario.findByIdAndUpdate(req.params.id, datos)
            if(editado){
                res.json({"mensaje": "usuario guardado"}).status(200)
            }else{
                res.json({no:"no"})
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

module.exports={
    actualizarProducto,
    borrarProducto,
    nuevoProducto, 
    actualizarUsuario
}