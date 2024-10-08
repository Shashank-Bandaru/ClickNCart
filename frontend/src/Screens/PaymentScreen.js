import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


function PaymentScreen(props) {

  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if(paymentMethod===''){
      // toast.error("Please select a payment method before proceeding to next step");
      alert("Please select a payment method before proceeding to next step");
      return;
    }
    dispatch(savePayment({ paymentMethod }));
    navigate('/placeorder');
  }
  return <div>
    <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Payment</h2>
          </li>

          <li>
            <div>
              <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}>
              </input>
              <label htmlFor="paymentMethod">
                Paypal
          </label>
            </div>

          </li>



          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default PaymentScreen;