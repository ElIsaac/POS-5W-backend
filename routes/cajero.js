const { Router } =require('express');
const router = Router();
const md_isAuth=require("../middlewares/md_isAuth")
const cajeroConroller = require('../controllers/cajeroController');

router.post("/cobrar", [md_isAuth.cajeroAuth], cajeroConroller.cobrar)

router.get("/productos/todos",[md_isAuth.cajeroAuth], cajeroConroller.traerProductos)

router.get("/productos/:id", [md_isAuth.cajeroAuth], cajeroConroller.traerProducto)

router.get("/ticket/todos", [md_isAuth.cajeroAuth], cajeroConroller.traerTickets)


router.get("/ticket/:id", [md_isAuth.cajeroAuth], cajeroConroller.mandarPdfTicket)


module.exports = router