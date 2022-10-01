import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {        
        slug: {type: String, required: true, unique: true},
        gender: {type: String, required: true},
        category: {type: String, required: true},
        collectionSeason: {type: String, required: true},
        onSale: {type: Boolean, required: true},
        discount: {type: Number, required: true},
        title: {type: String, required: true},
        price: {type: Number, required: true},
        color: {type: String, required: true},
        src: {type: String, required: true, unique: true},
        quantityInStock: {type: Number, required: true},
        ratings: {type: Number, required: true},
        numOfReviews: {type: Number, required: true},
        description: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;