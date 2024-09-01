import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Spinner from '../components/spinner';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(id));
    return () => {
      //
    };
    // eslint-disable-next-line
  }, [productSaveSuccess]);


  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };

  const handleAddToCart = () => {
    navigate('/cart/' + id + '?qty=' + qty);
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">&lt; Back to result</Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
        <div className="details">
          <div className="details-image">
            <img src={process.env.REACT_APP_LINK+product.image} alt="product"></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
               <b>Name: </b> <h4 style={{color:"#00008B",fontFamily:"monospace",fontWeight:"bold",fontSize:"2.5rem"}}>{product.name}</h4>
              </li>
              <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
              <li>
                <b>Price:</b> <b style={{color:"green",fontSize:"2.15rem"}}>${product.price}</b>
              </li>
              <li>
               <b>Description:</b> 
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li><b>Price:</b> ${product.price}</li>
              <li>
               <b>Status: </b> {' '}{product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
              </li>
              <li>
                <b>Qty:</b>{' '}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button primary">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="content-margined">
        <h2 style={{fontFamily:"sans-serif" ,fontWeight:"bold"}}><u>Reviews </u></h2>
        {!(product.reviews).length && <div>There is no review</div>}
        <ul className="review" id="reviews">
          {product.reviews.map((review,index) => (
            <li key={review._id}>
              <div>{index+1}{') '}<b>User :</b> {review.name}</div>
              <div>
              <b>Rating :</b> {review.rating}
                <Rating value={review.rating}></Rating>
              </div>
              <div><b>Date : </b>{review.createdAt.substring(0, 10)}</div>
              <div><b>Comment : </b>{review.comment}</div>
            </li>
          ))}
          <li>
            <h3>Write a customer review</h3>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <ul className="form-container">
                  <li>
                    <label htmlFor="rating">Rating</label>
                    <select
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </li>
                  <li>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </li>
                  <li>
                    <button type="submit" className="button primary">
                      Submit
                    </button>
                  </li>
                </ul>
              </form>
            ) : (
              <div>
                Please <Link to="/signin">Sign-in</Link> to write a review.
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  )}
    </div>
  );
}
export default ProductScreen;
