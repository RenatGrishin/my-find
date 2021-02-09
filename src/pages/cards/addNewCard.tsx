import React, {useState} from "react";
import css from "./editCard.module.css";
import {Link} from "react-router-dom";

function addNewCard() {
  //const [newUserCard, setNewUserCard] = useState({id:0, cardName:'', cardNumb:'', cardMonth:0, cardYear:0});

  return <div className={css.main}>
    <Link to={`/myCards`}><h3>Назад</h3></Link>
    <div className={css.card}>
      <p>Номер:</p><input type={`text`} value={``}/> <br/>

      <p>Имя Фамилия: </p><input type={`text`} value={``}/> <br/>

      <p>ММ | ГГ </p><input className={css.input_DD_MM} type={`text`} value={``}/>
      <input className={css.input_DD_MM} type={`text`} value={``}/> <br/>
    </div>
    <div className={css.btn_down}>
      <input className={css.btn_save} type={`submit`} value={`Сохранить`}/>
      <Link to={`/myCards`}><input className={css.btn_cancel} type={`submit`} value={`Отменить`}/></Link>
    </div>
  </div>
}

export default addNewCard;