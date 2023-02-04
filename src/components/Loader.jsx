import React from "react";
import loading from "../styles/img/loading.gif"
import s from "../styles/Loader.module.css"

const Loader = () => {
    return (
     
        <div className={s.loading}>
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