

// import React from "react";
import React, { useState,useContext } from "react";


import '../styles/TopBanner.css';
import AnonContext from "../auth/AnonContext";

import A2Api from "../api/a2api";

// import untitled from "../resources/images/untitled.jpg";

function TopBanner() {

    let is_admin = false;

    const { anon } = useContext(AnonContext);
    
    if(anon){
        is_admin = anon.is_admin;
    }


    return (
        <div className="top-banner">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Anons Anonymous</h1>
                <p className="lead">anti-social networking</p>
                {is_admin && <p>WELCOME ADMIN</p>}
            </div>
        </div>
    );
  }
  
  export default TopBanner;