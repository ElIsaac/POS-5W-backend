const { Router } =require('express');
const usuariosConroller = require('../controllers/usuariosController');
const router = Router();


router.get("/inicia-sesion", usuariosConroller.iniciar);

router.post("/registrate", usuariosConroller.registrar);

module.exports = router