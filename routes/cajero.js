const { Router } =require('express');
const router = Router();
const md_isAuth=require("../middlewares/md_isAuth")
const cajeroConroller = require('../controllers/cajeroController');

router.post("/cobrar", [md_isAuth.cajeroAuth], cajeroConroller.cobrar)

router.get("/productos/:id", [md_isAuth.cajeroAuth], cajeroConroller.traerProducto)

router.get("/productos",[md_isAuth.cajeroAuth], cajeroConroller.traerProductos)


module.exports = router