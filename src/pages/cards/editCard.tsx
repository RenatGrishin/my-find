import React, {useContext, useState} from "react";
import {MyCardsContext} from "../../App";
import {Link} from "react-router-dom";
import css from "./editCard.module.css";

function EditCard (props:any){
  const myCard = useContext(MyCardsContext);
  let [cardInfo, setCardInfo] = useState({id:0, cardName:'', cardNumb:'', cardMonth:0, cardYear:0});
  const cardIdURL = Number(props.props.match.params.number);

  /* Создаем карточку для редактирования */
  function instCardInfo (){
    let newInfo = myCard.find(card => card.id === cardIdURL);
    if (newInfo === undefined) {
      throw new TypeError('The value was promised to always be there!');
    }
    return {
      id: newInfo.id,
      cardName: newInfo.cardName,
      cardNumb: newInfo.cardNumb,
      cardMonth: newInfo.cardMonth,
      cardYear: newInfo.cardYear
    }
  }
  /* Изменяем данные о карте */
  function editInfoCard (value:string, type:string){
    setCardInfo((prev) => {
      let newCard = {...prev}
      switch (type) {
        case 'number': newCard.cardNumb = value; break;
        case 'name': newCard.cardName = value; break;
        case 'month': newCard.cardMonth = Number(value); break;
        case 'year': newCard.cardYear = Number(value); break;
      }
      return newCard;
    })
  }
  /* Создаем новую карту */
  function createNewCard (){
    let cardId = 0
    if( myCard.length !== 0 ) cardId = myCard[myCard.length-1].id + 1;
    setCardInfo( (prev) =>{
      prev.id = cardId;
      return prev
    } )
  }

  /* Рисуем кнопки */
  function getButtons() {
    if (isNaN(cardIdURL)){
      return <div className={css.btn_down}>
        <Link to={`/myCards`}><input className={css.btn_save} type={`submit`} onClick={()=>{ props.add(cardInfo)}} value={`Добавить`}/></Link>
        <Link to={`/myCards`}><input className={css.btn_cancel} type={`submit`} value={`Отменить`}/></Link>
      </div>
    }else{
      return <div className={css.btn_down}>
        <Link to={`/myCards`}><input className={css.btn_save} type={`submit`} onClick={()=>{ props.edit(cardInfo)}} value={`Сохранить`}/></Link>
        <Link to={`/myCards`}><input className={css.btn_cancel} type={`submit`} value={`Отменить`}/></Link>
        <Link to={`/myCards`}><input className={css.btn_delete} type={`submit`} onClick={() => {props.delete(cardInfo.id)}} value={`Удалить`}/></Link>
      </div>
    }
  }

  if(cardInfo.id !== cardIdURL && !isNaN(cardIdURL)){
    setCardInfo((prev) => {
      return instCardInfo();
    })
  } else if(isNaN(cardIdURL) && cardInfo.id === 0) {
    createNewCard();
  }

  return<div className={css.main}>
    <Link to={`/myCards`}><h3>Назад</h3></Link>
    <div className={css.card}>
      <p>Номер:</p><input type={`text`}
                          onChange={(e)=>{editInfoCard(e.target.value, `number`)}}
                          value={`${cardInfo.cardNumb}`}/> <br/>

      <p>Имя Фамилия: </p><input type={`text`}
                                 onChange={(e)=>{editInfoCard(e.target.value, `name`)}}
                                 value={`${cardInfo.cardName}`}/> <br/>

      <p>ММ | ГГ </p><input className={css.input_DD_MM} type={`text`}
                           onChange={(e)=>{editInfoCard(e.target.value, `month`)}}
                           value={`${cardInfo.cardMonth}`}/>
      <input className={css.input_DD_MM} type={`text`}
                         onChange={(e)=>{editInfoCard(e.target.value, `year`)}}
                         value={`${cardInfo.cardYear}`}/> <br/>
    </div>
    {getButtons()}
  </div>
}

export default EditCard;