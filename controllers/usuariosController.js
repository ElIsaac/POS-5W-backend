const Usuario = require("../models/Usuario")

///////////Peticion http "Post" para iniciar sesion////////
async function iniciar(req, res){
    res.send("actualizar producto")
}

///////////Peticion http "Post" para registrar usuarios////////
async function registrar(req, res){
    const { nombre, apellidos, email, contrasenia, confirmaContrasenia }=req.body
    try {
        if(nombre=="" || apellidos=="" || email=="" || contrasenia=="" || confirmaContrasenia=="" ){
            res.json({"error": "debe de llenar todos los campos"}).status(400)
        }
        if(contrasenia!==confirmaContrasenia){
            res.json({"error":"Las contraseñas no coinciden"}).status(400)
        }
        if(contrasenia.length <= 4){
            res.json({"mensaje":"la contraseña debe de ser mayor a 4 caracteres"}).status(400)
        }
        const nuevoUsuario=new Usuario({
            nombre:nombre,
             apellidos:apellidos,
             email:email.toLowerCase(),
             admin: false,
        })
        nuevoUsuario.contrasenia = await nuevoUsuario.encriptar(contrasenia)
        await nuevoUsuario.save()
        res.json({"mensaje": "usuario guardado"}).status(200)
    } catch (error) {
        
        if(error.code === 11000){
            res.json({"error": `El email '${email}' ya esta en usar uno diferente`} ).status(500)
        }
        else{
            res.json( {"error": "ha ocurrido un error en el servidor"} ).status(500)
        }
    }
}

module.exports={
    registrar,
    iniciar,
}