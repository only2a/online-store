const Router=require('express');
const { model } = require('../db');
const router=new Router();
const productController=require('../controllers/ProductController');
const checkRole= require('../middleware/productRoleMiddleware');

router.post('/',checkRole("ADMIN"),productController.create);
router.get('/',productController.getAll);
router.get('/:id',productController.getById);


module.exports= router;
