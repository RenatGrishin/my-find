import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {MyCardsContext, FindCardsContext} from "../../App";
import css from "./myCards.module.css";

function MyCards(props:any) {
  let myCard = useContext(MyCardsContext);
  let findCard = useContext(FindCardsContext);
  let showCards = [{id:0, cardNumb:'', cardName:'', cardMonth:0, cardYear:0, maybeOwner:[0], owner:0}];

  if(props.type === 'myCards') showCards = myCard;
  if(props.type === 'findCards') showCards = findCard;

  function getMyCards(id:number, cardNumb:string) {
    return <div key={id} className={css.body}>
      <Link className={css.card_numb} to={`/${props.type}/card/${id}`}> {cardNumb} </Link>
      <a className={css.btn_x} onClick={() => {props.delete(id, props.type)}}> X</a>
    </div>
  }

  return<div className={css.main}>
    <h3><Link to={`/`}>Найденные карты</Link></h3>
    <div>
      {showCards.map(card => getMyCards(card.id, card.cardNumb))}
      <div className={css.body}>
        <Link className={css.add_card} to={`/${props.type}/addNewCard`}>+ Добавить новую карту</Link>
      </div>
    </div>
  </div>
}

export default MyCards;