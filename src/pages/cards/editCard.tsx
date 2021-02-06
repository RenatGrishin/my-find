import React, {useContext, useState} from "react";
import {MyCardsContext} from "../../App";
import {Link} from "react-router-dom";

function EditCard (props:any){
  const myCard = useContext(MyCardsContext);
  let [cardInfo, setCardInfo] = useState(myCard.editCard);
  const cardIdURL = Number(props.props.match.params.number);
  console.log(props)

  /*
  Исправить ошибку с сохранением данными о карте.
  сейчас изменения хранятся в cardInfo,  надо чтоб оно хранилось в props.myCard.editCard
  */

  /* Создаем карточку для редактирования */
  function instCardInfo (){
    let newInfo = myCard.allCards.find(card => card.id === cardIdURL);
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

  if(cardInfo.id !== cardIdURL){
    setCardInfo((prev) => {
      return instCardInfo();
    })
  }

  debugger

  return<div>
    <Link to={`/myCards`}><h3>Назад</h3></Link>
    <div>
      <p>Номер:</p><input type={`text`}
                          onChange={(e)=>{editInfoCard(e.target.value, `number`)}}
                          value={`${cardInfo.cardNumb}`}/> <br/>
      <p>Имя Фамилия: </p><input type={`text`}
                                 onChange={(e)=>{editInfoCard(e.target.value, `name`)}}
                                 value={`${cardInfo.cardName}`}/> <br/>
      <p>Месяц: </p><input type={`text`}
                           onChange={(e)=>{editInfoCard(e.target.value, `month`)}}
                           value={`${cardInfo.cardMonth}`}/> <br/>
      <p>Год: </p><input type={`text`}
                         onChange={(e)=>{editInfoCard(e.target.value, `year`)}}
                         value={`${cardInfo.cardYear}`}/> <br/>
    </div>
    <input type={`submit`} onClick={()=>{ props.edit(cardIdURL)}} value={`Сохранить`}/>
    <input type={`submit`} value={`Отменить`}/>
    <input type={`submit`} value={`Удалить`}/>
  </div>
}

export default EditCard;