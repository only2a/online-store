const sequelize=require('../db');
const {DataTypes}=require('sequelize');


const User=sequelize.define('user', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue:'USER'}
});

const Basket=sequelize.define('basket', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true}
});

const Basket_Product=sequelize.define('basket_product', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true}
});

const Product=sequelize.define('product', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    price:{type:DataTypes.DECIMAL,allowNull:false},
    rating:{type:DataTypes.INTEGER,defaultValue:0},
    img:{type:DataTypes.STRING,allowNull:false}
});

const Type=sequelize.define('type', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false}
});

const Brand=sequelize.define('brand', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false}
});

const Rating=sequelize.define('rating', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    rate:{type:DataTypes.INTEGER,allowNull:false}
});

const Product_info=sequelize.define('product_info', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false}
});

const Type_Brand=sequelize.define('type_brand',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true}
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(Basket_Product);
Basket_Product.belongsTo(Basket);

Product.hasMany(Basket_Product);
Basket_Product.belongsTo(Product);

Product.hasMany(Product_info, {as: 'info'});
Product_info.belongsTo(Product);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Type.belongsToMany(Brand, {through:Type_Brand});
Brand.belongsToMany(Type, {through: Type_Brand});

module.exports={
    User,
    Basket,
    Basket_Product,
    Rating,
    Product,
    Product_info,
    Type,
    Brand,
    Type_Brand
}