const { Router } =require('express');
const router = Router();

const usuarioComunConroller = require('../controllers/cajeroController');

router.get("/cobrar", usuarioComunConroller.cobrar)

module.exports = router