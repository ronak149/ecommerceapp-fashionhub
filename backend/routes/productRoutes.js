import express, { query } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    }
    catch(err) {
        res.status(401).send({ message: 'Failed to load products !' });
    }    
});

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const newproduct = new Product ({
        slug:'Sample0-Name'+ Date.now(),
        gender: 'Sample-Gender',
        category: 'Sample-Category',
        collectionSeason: 'Sample-Collection',
        onSale: true,
        discount: 75,
        title: 'Sample-Title',
        price: 50,
        color: 'Sample-Color',
        src: 'mens-basic-tees.jpg',
        quantityInStock: 0,
        ratings: 0,
        numOfReviews: 0,
        description: 'Sample-Desc',
    });

    try {
        const product = await newproduct.save();
        res.send({ message: 'Product created', product});
    }
    catch (err) {
        res.status(401).send({message: 'Product creation failed!'});
    }    
}))

productRouter.get('/search', expressAsyncHandler(async (req, res) => {
    const {query} = req;
    const gender = query.gender || '';
    const type = query.type || '';
    const category = query.category || '';
    const color = query.color || '';
    const collection = query.collection || '';
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const genderFilter = gender && gender !== 'all' ? { gender } : {};

    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        title: {
            $regex: searchQuery,
            $options: 'i'
        }        
    } 
    : {} ;

    const typeFilter = type && type !== 'all' ? { onSale: true } : {};

    const colorFilter = color && color !== 'all' ? { color } : {} ;

    const collectionFilter = collection && collection !== 'all' ? { collectionSeason: collection } : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};

    const ratingFilter = rating && rating !== 'all' ? { rating: { $gte: Number(rating)}} : {};

    const priceFilter = price && price !== 'all' ? {
        price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1])
        },
    } : {};

    const sortOrder = order === 'featured' 
        ?   { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 } 
        : order === 'toprated'
        ? { rating : -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    try {
        const products = await Product.find({
            ...genderFilter,
            ...typeFilter,
            ...queryFilter,
            ...collectionFilter,
            ...colorFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
        .sort(sortOrder);
    
        res.send({products});
    }
    catch(err) {
        res.status(401).send({ message: 'Product not found !' });
    } 

    
}));

productRouter.get('/categories', expressAsyncHandler( async (req, res) => {
    const categories = await Product.find().distinct('category');
    const colors = await Product.find().distinct('color');
    const collections = await Product.find().distinct('collectionSeason')
    res.send({ categories, colors, collections });
}));

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({slug:req.params.slug});
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product not found!'});
    }
});

productRouter.put('/:id',  isAuth, isAdmin, expressAsyncHandler (async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.title = req.body.title;
        product.gender = req.body.gender;
        product.category = req.body.category;
        product.color = req.body.color;
        product.slug = req.body.slug;
        product.price = req.body.price;
        product.src = req.body.src;
        product.quantityInStock = req.body.quantityInStock;
        product.collectionSeason = req.body.collectionSeason;
        product.onSale = req.body.onSale;
        product.discount = req.body.discount;
        product.ratings = req.body.ratings;
        product.description = req.body.description;
        try {
            await product.save();
            res.send({ message: 'Product updated successfully!'});
        }
        catch(err){
            console.log(err.message);
        }
        
    }
    else {
        res.status(404).send({ message: 'Product not found!'});
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.remove();
        res.send({ message: 'Product deleted!'});
    }
     else {
        res.status(404).send({ message: 'Product not found!' });
     }
}));

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product Not Found'})
    }
});

export default productRouter;