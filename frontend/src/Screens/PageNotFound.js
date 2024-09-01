import React from 'react'
const PageNotFound = () => {
  return (
<> <div className="flex-coloumn"style={{
               position: 'absolute',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)'
        }}>
          <h1 style={{fontFamily:"monospace",fontSize:"8rem"}}>404 ERROR</h1>
          <h2 style={{fontSize:"4rem"}}>Oops! The page you are looking for was not found please go back to Home.</h2>
        </div></>
  )
}

export default PageNotFound