import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import Order from '../models/orderModel.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {   
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((item) => ({ ...item, product: item._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    })
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}))

orderRouter.get('/:orderId', async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if(order) {
        res.send(order);
    }
    else {
        res.status(404).send({message: 'Order Not Found'})
    }
})

orderRouter.put('/:orderId/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updateOrder = await order.save();
        res.send({ message: 'Order Paid', order: updateOrder });
    }
    else {
        res.status(404).send( { message: 'Order not found' });
    }
})
)

export default orderRouter;