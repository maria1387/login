const {Router} = require('express');
// const pool = require('../db')
const { crearregistros, acceso } = require('../controllers/auth.controllers')


const router = Router();

//crear usuario
router.post('/signup', crearregistros)
router.post('/login', acceso)
module.exports = router;