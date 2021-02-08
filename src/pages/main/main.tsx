import React from "react";
import style from "./main.module.css";
import {Link} from "react-router-dom";

function Main() {
  return <div className={style.main}>
    <div className={style.my_stuff}>
      <Link to={`/myCards`}><a>Мои карты</a></Link>
    </div>
    <div className={style.my_maybe}>Это ваши?</div>
    <div className={style.chat}>Чат</div>
    <div className={style.i_lost}>Я потерял</div>
    <div className={style.i_find}>Я нашел</div>
  </div>
}

export default Main;