const { Router } =require('express');
const adminConroller = require('../controllers/adminConroller');
const router = Router();
const md_isAuth = require("../middlewares/md_isAuthAdmin")


router.post("/admin/productos/nuevo", [md_isAuth.auth], adminConroller.nuevoProducto)

router.delete("/admin/productos/:id", [md_isAuth.auth], adminConroller.borrarProducto)

router.put("/admin/productos/:id", [md_isAuth.auth], adminConroller.actualizarProducto)
router.put("/admin/usuario/:id", [md_isAuth.auth], adminConroller.actualizarUsuario)

module.exports = router