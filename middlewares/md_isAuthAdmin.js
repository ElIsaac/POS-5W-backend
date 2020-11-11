const jwt = require('jwt-simple');
const moment=require('moment')

////////Palabra secreta
const {SECRET_KEY} =require('../services/secret-key');

exports.auth=(req, res, next)=>{

    if(!req.headers.authorization){
        return res
        .status(403)
        .json({"mensaje": "No esta autorizado para acceder a este recurso"})
    }

    const token = req.headers.authorization.replace(/['"]+/g, "")
    try {
        var payload=jwt.decode(token, SECRET_KEY)
        if(payload.exp <= moment.unix()){
            return res
        .status(403)
        .json({"error": "Su token ya ha expirado"})
        }
        if(payload.admin === false){
            return res
        .status(400)
        .json({"error": "Solo los administradores puden accesar a esta seccion"})
        }
    } catch (error) {
        return res
        .status(404)
        .json({"error": "Token invalido"})
    }
    req.user=payload;
    next();
}