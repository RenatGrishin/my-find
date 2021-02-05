import React, {useContext, useState} from "react";
import {MyCardsContext} from "../../App";
import {Link} from "react-router-dom";

function EditCard (props:any){
  const myCard = useContext(MyCardsContext);
  const [cardInfo, setCardInfo] = useState(myCard.editCard);
  const cardIdURL = Number(props.props.match.params.number);

  /* Создаем карточку для резактирования */
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
  function editInfoCard (value:string, type:string){
    setCardInfo((prev) => {
      switch (type) {
        case 'number': prev.cardNumb = value; break;
        case 'name': prev.cardName = value; break;
        case 'month': prev.cardMonth = Number(value); break;
        case 'year': prev.cardYear = Number(value); break;
      }
      return prev
    })
  }

  if(cardInfo.id !== cardIdURL){
    setCardInfo((prev) => {
      return instCardInfo();
    })
  }

  return<div>
    <Link to={`/myCards`}><h3>Назад</h3></Link>
    <div>
      <p>Номер:</p><input type={`text`}
                          onChange={(e)=>{editInfoCard(e.target.value, `number`)}}
                          value={`${cardInfo.cardNumb}`}/> <br/>
      <p>Имя Фамилия: </p><input type={`text`} defaultValue={`${cardInfo.cardName}`}/> <br/>
      <p>Месяц: </p><input type={`text`} defaultValue={`${cardInfo.cardMonth}`}/> <br/>
      <p>Год: </p><input type={`text`} defaultValue={`${cardInfo.cardYear}`}/> <br/>
    </div>
    <input type={`submit`} value={`Сохранить`}/>
    <input type={`submit`} value={`Отменить`}/>
    <input type={`submit`} value={`Удалить`}/>
  </div>
}

export default EditCard;