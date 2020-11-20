const Usuario = require("../models/Usuario")
const jwt = require("../services/jwt")

///////////Peticion http "Post" para iniciar sesion////////
async function iniciar(req, res){
    const {email, contrasenia}=req.body;

    try {
        if(email==="" || contrasenia===""){
           return res.json({"error": "debe de llenar todos los campos"}).status(400)
        }

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ error: "usuario inexistente" })
        }

        const contraseniaValida = await usuario.matchPassword(req.body.contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            return res.status(400).json({ error: "contraseña incorrecta" })
        }
        else{
            return res.json({
                AccessToken: jwt.accessToken(usuario)
            })
        }

    } catch (error) {

        res.json( {"error": "ha ocurrido un error en el servidor"} ).status(500)
        
    }
}

///////////Peticion http "Post" para registrar usuarios////////
async function registrar(req, res){
    const { nombre, apellidos, email, contrasenia, confirmaContrasenia }=req.body
    try {
        if(nombre=="" || apellidos=="" || email=="" || contrasenia=="" || confirmaContrasenia=="" ){
            res.json({"error": "debe de llenar todos los campos"}).status(400)
        }
        else if(contrasenia!==confirmaContrasenia){
            res.json({"error":"Las contraseñas no coinciden"}).status(400)
        }
        else if(contrasenia.length <= 4){
            res.json({"error":"la contraseña debe de ser mayor a 4 caracteres"}).status(400)
        }
        else{
            const nuevoUsuario=new Usuario({
                nombre:nombre,
                 apellidos:apellidos,
                 email:email.toLowerCase(),
                 admin: false,
            })
            nuevoUsuario.contrasenia = await nuevoUsuario.encriptar(contrasenia)
            await nuevoUsuario.save()
            res.json({"mensaje": "usuario guardado"}).status(200)
        }
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