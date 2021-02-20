import React, {useContext, useEffect, useState} from "react";
import {MyCardsContext, FindCardsContext} from "../../App";
import {Link} from "react-router-dom";
import css from "./editCard.module.css";

function EditCard (props:any){
  const myCard = useContext(MyCardsContext);
  const findCard = useContext(FindCardsContext);
  let showCards:any = {};
  let [buttonActive, setButtonActive] = useState(false);

  let [cardInfo, setCardInfo] = useState({id:0, cardName:'', cardNumb:'', cardMonth:0, cardYear:0});
  const cardIdURL = Number(props.props.match.params.number);

  /* Валидация */
  /* Ввод номера карты */
  function cardNumberValidation(number:string) {
    let numbersCardArray:string[]|null = number.match(/\d{1,1}/g);
    let numberCard:string = '';

    if (!numbersCardArray) return '';
    if (numbersCardArray.length > 16) return false;

    for(let i=0; i<numbersCardArray.length; i++){
      if(i !==0 && (i % 4) === 0 ){
        numberCard += ' ';
      }
      numberCard += numbersCardArray[i];
    }

    return numberCard;
  }
  /* Ввод имени */
  function cardNameValidation(name:string){
    name = name.toUpperCase();
    if (name.match(/[^A-Z\s]/g))return false;
    if (name.split(' ').length > 2) return false;
    if (name.slice(0,1) === ' ' ) return false;

    return name;
  }
  /* Ввод месяца и года */
  function cardMontAndYearValidation(date:string, type:string) {
    if (date.match(/[^\d]{1,2}/g)) return false;

    let numbDate:number = Number(date);

    if (type == 'month' && numbDate > 12 ) return false;
    if (type == 'year' && numbDate > 99 ) return false

    return numbDate;
  }
  /* Деактивация кнопки, если валидация не пройдена */
  useEffect(()=>{
    if(cardInfo.cardNumb.length < 19){
      console.log(`Номер карты введен не полностью`);
      setButtonActive( (prev)=>{ return false } );
    }else if (cardInfo.cardName.split(' ').length < 2) {
      console.log(`Поле владельца карты заполнено не полностью`);
      setButtonActive( (prev)=>{ return false } );
    } else if (cardInfo.cardMonth === 0) {
      console.log(`Месяц не может быть равено 0`);
      setButtonActive( (prev)=>{ return false } );
    } else {
      setButtonActive( (prev)=>{ return true } );
    }
  },[cardInfo]);

  /* Создаем карточку для редактирования */
  function instCardInfo (){
    if(props.type === 'myCards') showCards = myCard.find(card => card.id === cardIdURL);
    if(props.type === 'findCards') showCards = findCard.find(card => card.id === cardIdURL);
    if (showCards === undefined) {
      throw new TypeError('The value was promised to always be there!');
    }
    return {
      id: showCards.id,
      cardName: showCards.cardName,
      cardNumb: showCards.cardNumb,
      cardMonth: showCards.cardMonth,
      cardYear: showCards.cardYear
    }
  }
  /* Изменяем данные о карте */
  function editInfoCard (value:string, type:string){
    let validation: string | number | boolean;
    setCardInfo((prev) => {
      let newCard = {...prev}
      switch (type) {
        case 'number':
          validation = cardNumberValidation(value);
          if (validation !== false ) newCard.cardNumb = validation;
          break;
        case 'name':
          validation = cardNameValidation(value);
          if (validation !== false ) newCard.cardName = validation;
          break;
        case 'month':
          validation = cardMontAndYearValidation(value, type);
          if (validation !== false ) newCard.cardMonth = validation;
          break;
        case 'year':
          validation = cardMontAndYearValidation(value, type);
          if (validation !== false ) newCard.cardYear = validation;
          break;
      }
      return newCard;
    })
  }
  /* Создаем новую карту */
  function createNewCard (){
    let cardsList:any[] = [];
    if(props.type === 'myCards') myCard.map(card => cardsList.push(card));
    if(props.type === 'findCards') findCard.map(card => cardsList.push(card));
    if (cardsList === undefined) {
      throw new TypeError('The value was promised to always be there!');
    }

    let cardId = 0;
    if( cardsList.length !== 0 ) cardId = cardsList[cardsList.length-1].id + 1;
    setCardInfo( (prev) =>{
      prev.id = cardId;
      return prev
    } )
  }
  /* Рисуем кнопки */
  function getButtons() {
    if (isNaN(cardIdURL)){
      return <div className={css.btn_down}>
        <Link to={`/${props.type}`}><input className={css.btn_save}
                                           disabled={buttonActive ? false : true}
                                           type={`submit`}
                                           onClick={()=>{ props.add(cardInfo, props.type) }}
                                           value={`Добавить`}/></Link>
        <Link to={`/${props.type}`}><input className={css.btn_cancel} type={`submit`} value={`Отменить`}/></Link>
      </div>
    }else{
      return <div className={css.btn_down}>
        <Link to={`/${props.type}`}><input className={css.btn_save}
                                           disabled={buttonActive ? false : true}
                                           type={`submit`} onClick={()=>{ props.edit(cardInfo, props.type)}}
                                           value={`Сохранить`}/></Link>
        <Link to={`/${props.type}`}><input className={css.btn_cancel} type={`submit`} value={`Отменить`}/></Link>
        <Link to={`/${props.type}`}><input className={css.btn_delete} type={`submit`} onClick={() => {props.delete(cardInfo.id, props.type)}} value={`Удалить`}/></Link>
      </div>
    }
  }
  function getLinks() {
    if(props.type === 'myCards') return <Link to={`/${props.type}`}><h3>Моя карта</h3></Link>;
    if(props.type === 'findCards') return <Link to={`/${props.type}`}><h3>Найденная карта</h3></Link>
  }

  if(cardInfo.id !== cardIdURL && !isNaN(cardIdURL)){
    setCardInfo((prev) => {
      return instCardInfo();
    })
  } else if(isNaN(cardIdURL) && cardInfo.id === 0) {
    createNewCard();
  }

  return<div className={css.main}>
    {getLinks()}
    <div className={css.card}>
      <p>Номер:</p><input type={`text`}
                          onChange={(e)=>{
                            editInfoCard(e.target.value, `number`);
                          }}
                          value={`${cardInfo.cardNumb}`}/> <br/>

      <p>Имя Фамилия: </p><input type={`text`}
                                 onChange={(e)=>{
                                   editInfoCard(e.target.value, `name`);
                                 }}
                                 value={`${cardInfo.cardName}`}/> <br/>

      <p>ММ | ГГ </p><input className={css.input_DD_MM} type={`text`}
                           onChange={(e)=>{
                             editInfoCard(e.target.value, `month`);
                           }}
                           value={`${cardInfo.cardMonth}`}/>
      <input className={css.input_DD_MM} type={`text`}
                         onChange={(e)=>{editInfoCard(e.target.value, `year`)}}
                         value={`${cardInfo.cardYear}`}/> <br/>
    </div>
    {getButtons()}
  </div>
}

export default EditCard;