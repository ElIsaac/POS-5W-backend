const { Router } =require('express');
const router = Router();

const usuarioComunConroller = require('../controllers/usuarioComunController');

router.get("/cobrar", usuarioComunConroller.cobrar)

module.exports = router