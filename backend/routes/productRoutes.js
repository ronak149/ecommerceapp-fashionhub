import express, { query } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

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
        res.status(404).send({message: 'Product Not Found'})
    }
})

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product Not Found'})
    }
})

export default productRouter;