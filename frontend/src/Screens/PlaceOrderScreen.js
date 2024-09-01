import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const [neworder,setneworder] = useState(false);

  const { cartItems, shipping, payment } = cart;
  useEffect(()=>{

    if (!shipping.address) {
      navigate('/shipping');
    } else if (!payment.paymentMethod) {
      navigate('/payment');
    } // eslint-disable-next-line
  },[])
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    setneworder(true);
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success && neworder) {
      
      navigate('/order/' + order._id);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3 style={{fontWeight:"bold"}}>Shipping Address</h3>
            <div>
              {cart.shipping.address}, {cart.shipping.city},
              {cart.shipping.postalCode}, {cart.shipping.country},
            </div>
          </div>
          <div>
            <h3 style={{fontWeight:"bold"}}>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3 style={{fontWeight:"bold"}}>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={process.env.REACT_APP_LINK+item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={'/product/' + item.product}><b>{item.name}</b></Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice?.toFixed(2)}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice?.toFixed(2)}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice?.toFixed(2)}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
