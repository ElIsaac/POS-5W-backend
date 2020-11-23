const bcrypt = require("bcryptjs");


const encriptar = async contrasenia => {
    const salt = await bcrypt.genSalt(10);////gen salt(10) es el parametro que se da para que tan fuerte sara la encriptacion
    return await bcrypt.hash(contrasenia, salt);
  };
  
  /////////////////////este metodo es para encriptar la contraseña del inicio de sesion 
  /////////////y compararla con la contraseña encriptada original
const comparar = async function(contrasenia, hashContrasenia) {
    return await bcrypt.compare(contrasenia, hashContrasenia);
  };

module.exports={
    encriptar,
    comparar
}