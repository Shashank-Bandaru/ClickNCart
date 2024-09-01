import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const { id } = useParams();
  const productId = id;
  const [searchParams] = useSearchParams();
  const qty = searchParams ? Number(searchParams.get('qty')) : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // eslint-disable-next-line
  }, []);

  const checkoutHandler = () => {
    navigate('/signin?redirect=shipping');
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h2 style={{fontWeight:"bold"}}>Shopping Cart</h2>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={process.env.REACT_APP_LINK+item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={'/product/' + item.product}><b>{item.name}</b></Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button  bg-danger text-white mx-3"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3 style={{fontWeight:"bold"}}>
          Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) :
          $ {(cartItems.reduce((a, c) => a + c.price * c.qty, 0))?.toFixed(2)}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
