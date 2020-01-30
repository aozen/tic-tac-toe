import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../index.css";

function Restart({ onClick,gameRefresh }) {

    return (
      <button className="restart" onClick={onClick}>
       {gameRefresh ? "Skoru Sıfırla" : "Yeniden Oyna"}
      </button>
    );
  }


  export default Restart;