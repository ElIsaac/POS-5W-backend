const { Router } =require('express');
const adminConroller = require('../controllers/adminConroller');
const router = Router();
const md_isAuth = require("../middlewares/md_isAuthAdmin")


router.get("/admin/tickets", [md_isAuth.auth], adminConroller.traerTickets)
router.get("/admin/usuarios", [md_isAuth.auth], adminConroller.traerUsuarios)


router.post("/admin/productos/nuevo", [md_isAuth.auth], adminConroller.nuevoProducto)

router.delete("/admin/productos/:id", [md_isAuth.auth], adminConroller.borrarProducto)
router.delete("/admin/usuarios/:id", [md_isAuth.auth], adminConroller.eliminarUsuario)

router.put("/admin/productos/:id", [md_isAuth.auth], adminConroller.actualizarProducto)
router.put("/admin/usuarios/:id", [md_isAuth.auth], adminConroller.actualizarUsuario)


module.exports = router