import React from "react";
import '../styles/TopBanner.css';
import AnonContext from "../auth/AnonContext";

import A2Api from "../api/a2api";

// import untitled from "../resources/images/untitled.jpg";

function TopBanner() {
    

    const { anon } = useContext(AnonContext);

    console.log('tb_anon===============================',anon);

    return (
        <div className="top-banner">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Anons Anonymous</h1>
                <p className="lead">anti-social networking</p>
                {/* <p>_______________________________________</p> */}
            </div>
        </div>
    );
  }
  
  export default TopBanner;