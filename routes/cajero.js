const { Router } =require('express');
const router = Router();
const md_isAuth=require("../middlewares/md_isAuth")
const cajeroConroller = require('../controllers/cajeroController');
const upload =require("../middlewares/imagen");
const cajeroController = require('../controllers/cajeroController');

router.post("/cobrar", [md_isAuth.cajeroAuth], cajeroConroller.cobrar)
router.post("/avatar/:id", upload.single("avatar"), [md_isAuth.cajeroAuth], cajeroController.subirAvatar)

router.get("/productos/todos",[md_isAuth.cajeroAuth], cajeroConroller.traerProductos)
router.get("/productos/:id", [md_isAuth.cajeroAuth], cajeroConroller.traerProducto)
router.get("/ticket/todos/:idCajero", [md_isAuth.cajeroAuth], cajeroConroller.traerMisTickets)
router.get("/ticket/:id", [md_isAuth.cajeroAuth], cajeroConroller.mandarPdfTicket)

//ruta totalmente publicca
router.get("/avatar/:id",  cajeroConroller.mandarAvatar)


module.exports = router