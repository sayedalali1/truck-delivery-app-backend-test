const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const verifyToken = require('../middleware/verify-token');


router.use(verifyToken);

router.post('/orders', async (req, res) => {
    try {
        const { from, to, price } = req.body;
        const order = new Order({
            from,
            to,
            price,
            customer: req.user._id,
        });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/orders/:orderId/location', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { lat, lng } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        order.location = { lat, lng };
        await order.save();
        res.send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/orders/:orderId/status', async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.send({ status: order.status, orderStatus: order.orderStatus });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
