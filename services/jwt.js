var jwt = require('jsonwebtoken');
const moment = require('moment');

const {SECRET_KEY} =require('./secret-key')

exports.accessToken = (usuario)=>{
    const payload={
        id: usuario._id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        admin: usuario.admin,
        fechaInicio: moment().unix(),
        fechaExpiracion: moment().add(5, "hours").unix()
    }
    return jwt.sign(payload, SECRET_KEY, {algorithm: "HS256"})
}



exports.decodeToken = (token)=>{
    
    try {
        const decode = jwt.verify(token, SECRET_KEY)
        return decode
    } catch (error) {
        console.log(err)
        return null
    }
}