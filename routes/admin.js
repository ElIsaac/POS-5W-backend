const { Router } =require('express');
const adminConroller = require('../controllers/adminConroller');
const router = Router();
const md_isAuth = require("../middlewares/md_isAuthAdmin")


router.get("/admin/productos",[md_isAuth.auth], adminConroller.traerProductos)

router.post("/admin/productos/nuevo", [md_isAuth.auth], adminConroller.nuevoProducto)

router.get("/admin/productos/:id", [md_isAuth.auth], adminConroller.traerProducto)

router.delete("/admin/productos/:id", [md_isAuth.auth], adminConroller.borrarProducto)

router.put("/admin/productos/:id", [md_isAuth.auth], adminConroller.actualizarProducto)

module.exports = router