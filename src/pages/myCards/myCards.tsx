import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {MyCardsContext} from "../../App";
import css from "./myCards.module.css";

function MyCards(props:any) {
  const myCard =  useContext(MyCardsContext);

  function getMyCards(id:number, cardNumb:string) {
    return <div key={id} className={css.body}>
      <Link to={`/myCards/card/${id}`}>
        <a className={css.card_numb}>{cardNumb}</a>
      </Link>
      <a className={css.btn_x} onClick={() => {props.delete(id)}}> X</a>
    </div>
  }

  return<div className={css.main}>
    <h3><Link to={`/`}>Найденные карты</Link></h3>
    <div>
      {myCard.map(card => getMyCards(card.id, card.cardNumb))}
      <div className={css.body}>
        <Link to={`/myCards/card/addNewCard`}>
          <a className={css.add_card}>+ Добавить новую карту</a>
        </Link>
      </div>
    </div>
  </div>
}

export default MyCards;