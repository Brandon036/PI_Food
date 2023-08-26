import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage() {
  return (
    <div className={style.p1d}>
      <div >
        <h1  >Entra y Vez nuestras Razas</h1>
        <div >
          <p>Aqui vas a encontrar toda la info sobre ellos :) </p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Ver INFO</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
