import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
}));

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
    try{
        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Created', order });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }

}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}))

orderRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler(async (req,res) => {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: { $sum: 1 },
                totalSales: { $sum: '$totalPrice' },
            },
        }
    ]);
    
    const users = await User.aggregate([
       {
        $group: {
            _id: null,
            numUsers: { $sum : 1 },
        }
       } 
    ]);

    const dailyOrders = await Order.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt'}
                },
                orders: { $sum: 1 },
                sales: { $sum: '$totalPrice'},
            }
        }, { $sort: { _id: 1 } }
    ]);

    res.send({ users, orders, dailyOrders });
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        await order.remove();
        res.send({ message: 'Order deleted!'});
    }
     else {
        res.status(404).send({ message: 'Order not found!' });
     }
}));

orderRouter.get('/:orderId', async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if(order) {
        res.send(order);
    }
    else {
        res.status(404).send({message: 'Order Not Found'})
    }
});

orderRouter.put('/:id/shipped', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {        
        order.isShipped = true;
        order.shippedOn = Date.now();
        try {
            const updatedOrder = await order.save();
            res.send({ message: 'Shipping status updated!', order: updatedOrder });
        }
        catch(err) {
            console.log(err.message);
        }        
    }
    else {
        res.status(401).send( { message: 'Order not found' });
    }
})
);

orderRouter.put('/:id/deliver', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {        
        order.isShipped = true;
        order.shippedOn = Date.now();
        order.isDelivered = true;
        order.deliveredOn = Date.now();
        try {
            const updatedOrder = await order.save();
            res.send({ message: 'Delivery status updated!', order: updatedOrder });
        }
        catch(err) {
            console.log(err.message);
        }        
    }
    else {
        res.status(401).send( { message: 'Order not found' });
    }
})
);

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
);

export default orderRouter;