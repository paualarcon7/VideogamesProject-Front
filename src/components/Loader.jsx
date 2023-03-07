import React from "react";
import loading from "../styles/img/loadinggg.gif"


const Loader = () => {
    return (
     
        <div>
          <img
            src={loading}
            alt="LoadingImage not found"
            width="350px"
            height="350px"
          />
        </div>
      
    );
  };
   
  export default Loader;