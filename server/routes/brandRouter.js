const Router=require('express');
const { model } = require('../db');
const router=new Router();
const brandController= require('../controllers/BrandController');
const checkRole= require('../middleware/productRoleMiddleware');


router.post('/',checkRole('ADMIN'),brandController.create);
router.get('/',brandController.getAll);


module.exports= router;