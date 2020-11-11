const { Router } =require('express');
const adminConroller = require('../controllers/usuarioAdminConroller');
const router = Router();
const md_isAuth = require("../middlewares/md_isAuth")


router.get("/admin/productos",[md_isAuth.auth], adminConroller.traerProductos)

router.post("/admin/productos/nuevo", adminConroller.nuevoProducto)

router.get("/admin/productos/:id", adminConroller.traerProducto)

router.delete("/admin/productos/:id", adminConroller.borrarProducto)

router.put("/admin/productos/:id", adminConroller.actualizarProducto)

module.exports = router