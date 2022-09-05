const Router=require('express');
const { model } = require('../db');
const router=new Router();
const typeController= require('../controllers/TypeController');
const checkRole= require('../middleware/productRoleMiddleware');

router.post('/',checkRole('ADMIN'),typeController.create);
router.get('/',typeController.getAll);


module.exports= router;
