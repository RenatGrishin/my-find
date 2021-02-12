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
  
  function getNoticeInfo() {
    if(!props.noticeCards.length) return false;

    return<div className={css.notice_block}>
      <input type={`submit`} value={"Карта у меня"} />
      <input type={`submit`} value={`Чат`} />
    </div>
  }

  debugger

  function getMyCards(id:number, cardNumb:string) {
    return <div className={css.main_body}>
      <div key={id} className={css.body}>
        <Link className={css.card_numb} to={`/${props.type}/card/${id}`}> {cardNumb} </Link>
        <a className={css.btn_x} onClick={() => {props.delete(id, props.type)}}> X</a>
      </div>
      {getNoticeInfo()}
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