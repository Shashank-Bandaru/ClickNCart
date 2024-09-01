import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createOrder,detailsOrder, payOrder } from '../actions/orderActions';
import Spinner from '../components/spinner';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import PaypalButton from '../components/PayPalButton';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay} = orderPay;

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
   
      dispatch(detailsOrder(id));
    
    // eslint-disable-next-line
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  
const initialOptions = {
  "client-id": process.env.PAYPAL_CLIENT_ID || "sandbox",
  currency: "USD",
  intent: "capture",
};

  //console.log(orderDetails);

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3 style={{fontWeight:"bold"}}>Shipping</h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
              {order.shipping.postalCode}, {order.shipping.country},
            </div>
            <div>
              {order.isDelivered
                ? 'Delivered at ' + order.deliveredAt
                : 'Not Delivered.'}
            </div>
          </div>
          <div>
            <h3 style={{fontWeight:"bold"}}>Payment</h3>
            <div>Payment Method: {order.payment.paymentMethod}</div>
            <div>{order.isPaid ? 'Paid at ' + order.paidAt : 'Not Paid.'}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3 style={{fontWeight:"bold"}}>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {order.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order.orderItems.map((item) => (
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={process.env.REACT_APP_LINK+item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={'/product/' + item.product}><b>{item.name}</b></Link>
                      </div>
                      <div >Qty: {item.qty}</div>
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
          <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
              <PayPalScriptProvider options={initialOptions}>
                <PaypalButton
                  amount={(order.totalPrice)?.toFixed(2)}
                  onSuccess={handleSuccessPayment} />
               </PayPalScriptProvider>
              }
            </li>
            <li>
              <h3 style={{fontWeight:"bold"}}>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${(order.itemsPrice)?.toFixed(2)}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${(order.shippingPrice)?.toFixed(2)}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${(order.taxPrice)?.toFixed(2)}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${(order.totalPrice)?.toFixed(2)}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
