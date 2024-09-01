import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});

router.get('/mine', isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get('/:id', isAuth, async (req, res) => {
  // console.log(req.params.id);
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send('Order Not Found.');
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(201).send({success:true,message:"Order deleted successfully"});
  } catch(error){
    res.status(404).send({success:false,message:error.message});
  }
});

router.post('/', isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', data: newOrderCreated});
});

router.put('/:id/pay', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();
    res.status(201).send({ message: 'Order Paid.', order: updatedOrder});
  } else {
    res.status(404).send({ message: 'Order not found.' ,success:false});
  }
});

export default router;
