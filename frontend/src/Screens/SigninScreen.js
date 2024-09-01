import React, { useEffect, useState } from 'react';
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import Spinner from '../components/spinner';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Hook
 
 const redirect = location.search ? location.search.split("=")[1] : '/';
 //console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      if(redirect!=='/')
      navigate('/'+redirect);
    else
     navigate('/');
    }
    return () => {
      //
    };// eslint-disable-next-line
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div><Spinner/></div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Sign in</button>
        </li>
        <li>
          New to clickncart?
        </li>
        <li>
        <Link to={redirect === "/" ? "/register" : "/register?redirect=" + redirect} className="button secondary text-center" >Create your clickncart account</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;