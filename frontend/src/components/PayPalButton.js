import React from 'react';
import {PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function PaypalButton(props) {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
 
  const createOrder = async(data, actions) => await actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount 
        }
      }
    ]
  });

//   const it = document.getElementById("paypal_link");
//   if(it!==null){
//       it.outerHTML = "";
//   }

  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

//   useEffect(() => {
    
//     if (window !== undefined && window.paypal === undefined) {
//         addPaypalSdk();
//     }
//     //    else if(window.paypal!==undefined){
//     //     const it = document.getElementById("paypal_link");
//     //     if(it!==null && !sdkReady){
//     //      it.outerHTML="";
//     //      addPaypalSdk();

//     //     }
//     //   }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//   if (!sdkReady) {
//     return <div>Loading...</div>
//   }
  

  return (
     <>
       {isPending ? <p>LOADING...</p> :  <>
    <PayPalButtons onError={(error)=>{console.log(error)}} style={{ layout: "vertical" }}{...props} createOrder={(data, actions) => createOrder(data, actions)}
    onApprove={(data, actions) => {try{onApprove(data, actions)}catch(error){console.log(error)}}} /></>}
   </>)
}

export default PaypalButton;