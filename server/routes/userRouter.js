const Router=require('express');
const { model } = require('../db');
const router=new Router();
const userController = require('../controllers/UserController')
const authMiddleware=require('../middleware/authMiddleware')

router.post('/registration',userController.registration);
router.post('/login', userController.login);
router.get('/auth',authMiddleware, userController.check);


module.exports= router;
