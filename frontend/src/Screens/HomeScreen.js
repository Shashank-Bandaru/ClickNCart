import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Spinner from '../components/spinner';
import Rating from '../components/Rating';

function HomeScreen() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const {id} = useParams();
  const category = id ? id : "";
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
    // eslint-disable-next-line
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
 
   useEffect(()=>{
    dispatch(listProducts(category, searchKeyword, sortOrder));
     // eslint-disable-next-line
   },[sortOrder,category]);

  return <>
  {category &&
    <h2 style={{fontWeight:"bold",fontFamily:"sans-serif"}}>{category}</h2>}

  <ul className="filter">
    <li>
      <form onSubmit={submitHandler}>
        <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
        <button type="submit" className='mx-3 bg-primary text-white'>Search</button>
      </form>
    </li>
    <li>
      Sort By {' '}
      <select name="sortOrder" id="select_menu_sorting" value={sortOrder} onChange ={(e)=>{
          setSortOrder(e.target.value);
          
      }}>
        <option value="newest">Newest</option>
        <option value="lowest">Lowest</option>
        <option value="highest">Highest</option>
      </select>
    </li>
  </ul>
  {loading ? <div><Spinner/></div> :
    error ? <div>{error}</div> :
      <ul className="products">
        {
          products.map(product =>
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img className="product-image" src={process.env.REACT_APP_LINK+product.image} alt="product" />
  
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    
                  />
                </div>
                <p style={{fontSize:"1.7rem"}}>({product.numReviews + ' reviews'})</p>
              </div>
            </li>)
        }
      </ul>
  }
</>
}
export default HomeScreen;
