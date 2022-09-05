const {Product,Product_info}= require('../models/models');
const ApiError=require('../error/ApiError');
const uuid=require('uuid');
const path= require('path');


class ProductController{
    async create(req, res,next){
        try{
            const {name, price, brandId,typeId, info}=req.body;
            const {img}=req.files;
            let fileName=uuid.v4() + ".jpeg";
            img.mv(path.resolve(__dirname,'..', 'static',fileName));
            const product = await Product.create({name, price, brandId, typeId, img:fileName});

            if(info){
                info= JSON.parse(info);
                info.forEach(el => {
                    Product_info.create({
                        title: el.title,
                        description: el.description,
                        productId: product.id
                    })
                });
            }
            return res.json(product);
        }
        catch(e){
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
        
    }
    async getAll(req, res){
        let {brandId,typeId,limit,page} = req.query;
        page = page || 1;
        limit= limit || 9;
        let offset= page* limit - limit
        let products;
        if( !brandId && !typeId){
            products= await Product.findAndCountAll({limit, offset});
        }
        else if(brandId && !typeId){
            products= await Product.findAndCountAll({where:{brandId},limit, offset});
        }
        else if(!brandId && typeId){
            products= await Product.findAndCountAll({where:{typeId},limit, offset});
        }
        else if(brandId && typeId){
            products= await Product.findAndCountAll({where:{brandId, typeId},limit, offset});
        }
        return res.json(products);
    }
    async getById(req, res){
        const {id}= req.params;
        const product= await Product.findOne({where: {id}, include:[{model: Product_info, as: 'info'}]});
        return res.json(product);
    }
}

module.exports=new ProductController();