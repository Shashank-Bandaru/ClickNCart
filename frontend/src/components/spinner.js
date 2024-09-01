import React,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
const Spinner = ({path=""}) => {

    const [ count,setCount] =  useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue)
        },1000);
        count===0 && navigate(`/${path}`,{
            state:location.pathname
        })
        if(count<0) {setCount(0);return ()=> clearInterval(interval);};
        return ()=> clearInterval(interval);
    },[count,navigate,location,path])

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center"
      style={{height:"100vh"}}>
        <h1 className="Text-center">Redirecting you in {count} seconds</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
