import style from "./App.module.css"
import Main from "./pages/main/main";
import {Route, Switch} from "react-router-dom";
import MyCards from "./pages/myCards/myCards";
import React, {useState} from "react";
import {userInfo} from "./store/user";
import {findCardsInfo} from "./store/findCards";
import {myCardsInfo} from "./store/myCards";
import EditCard from "./pages/cards/editCard";

const defaultValue:{
  id:number, cardName:string, cardNumb:string, cardMonth: number, cardYear: number, maybeOwner: number[], owner: number
}[] = [{ id: 0, cardName: "", cardNumb: "", cardMonth: 0, cardYear: 0, maybeOwner: [0], owner: 0 }];

export const MyCardsContext = React.createContext(defaultValue);
export const FindCardsContext = React.createContext(defaultValue);

function App(props:any) {
  const [user, setUser] = useState(userInfo);
  const [findCards, setFindCards] = useState(findCardsInfo);
  const [myCards, setMyCards] = useState(myCardsInfo)

  /* Сохраняем изменения в собственных картах */
  function editMyCard(cardEditInfo:{id:number, cardNumb:string, cardName:string, cardMonth:number, cardYear:number}, type:string) {
    let cardInfo:{
      id:number,
      cardName:string,
      cardNumb:string,
      cardMonth: number,
      cardYear: number,
      maybeOwner: number[],
      owner: number
    } = {id: 0, cardName: "", cardNumb: "", cardMonth: 0, cardYear: 0, maybeOwner: [], owner: 0};
    let arrIDCard:number;

    if(type === 'myCards'){
      arrIDCard =  myCards.findIndex(card => card.id === cardEditInfo.id);
      cardInfo = myCards[arrIDCard];
    } else if (type === 'findCards'){
      arrIDCard =  findCards.findIndex(card => card.id === cardEditInfo.id);
      cardInfo = findCards[arrIDCard];
    }

    cardInfo.cardNumb = cardEditInfo.cardNumb;
    cardInfo.cardName = cardEditInfo.cardName;
    cardInfo.cardMonth = cardEditInfo.cardMonth;
    cardInfo.cardYear = cardEditInfo.cardYear;
    cardInfo.maybeOwner = [0];
    cardInfo.owner = 0;

    if(type === 'myCards'){
      setMyCards( (prev) => {
        let cards = [...prev];
        cards[arrIDCard] = cardInfo;
        return cards;
      } )
    }else if (type === 'findCards'){
      setFindCards( (prev) => {
        let cards = [...prev];
        cards[arrIDCard] = cardInfo;
        return cards;
      } )
    }
  }
  /* Удаляем свою карточку */
  function deleteMyCard(id:number, type:string) {
    let newMyCardsList:{
      id:number,
      cardName:string,
      cardNumb:string,
      cardMonth: number,
      cardYear: number,
      maybeOwner: number[],
      owner: number
    }[] = [];

    if(type === 'myCards') {
      myCards.map( (card)=>{ if (card.id !== id) { newMyCardsList.push(card) } } );
      setMyCards((prev) => {
        prev = newMyCardsList;
        return prev;
      })
    }
    if(type === 'findCards') {
      findCards.map( (card)=>{ if (card.id !== id) { newMyCardsList.push(card) } } );
      setFindCards((prev) => {
        prev = newMyCardsList;
        return prev;
      })
    }


  }
  /* Добавить новую собственную карту */
  function addMyCard(cardEditInfo:{id:number, cardNumb:string, cardName:string, cardMonth:number, cardYear:number}, type:string) {
    if (type === `myCards`){
      setMyCards( (prev) =>{
        let newCard = {
          id: cardEditInfo.id,
          cardName: cardEditInfo.cardName,
          cardNumb: cardEditInfo.cardNumb,
          cardMonth: cardEditInfo.cardMonth,
          cardYear: cardEditInfo.cardYear,
          maybeOwner: [0],
          owner: 0
        }
        prev.push(newCard);
        return prev;
      } )
    }else if (type === `findCards`){
      setFindCards( (prev) =>{
        let newCard = {
          id: cardEditInfo.id,
          cardName: cardEditInfo.cardName,
          cardNumb: cardEditInfo.cardNumb,
          cardMonth: cardEditInfo.cardMonth,
          cardYear: cardEditInfo.cardYear,
          maybeOwner: [0],
          owner: 0
        }
        prev.push(newCard);
        return prev;
      } )
    }
  }

  return (
    <div className={style.main}>
      <header className={style.head}>
        <div className={style.main}>
          <img className={style.avatar} src={"../"} alt={"user Avatar"} />
          <h3 className={style.name}>Ренат <br/>Гришин</h3>
        </div>
        <div className={style.menu}>
          <img src={"../"} alt={"menu"}/>
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path={'/'} render={()=><Main/>} />
          <MyCardsContext.Provider value={myCards}>
            <Route exact path={'/myCards'} render={props=><MyCards type={`myCards`} delete={deleteMyCard} />} />
            <Route path={'/myCards/card/:number'} render={props=><EditCard
              type={`myCards`}
              props={props}
              edit={editMyCard}
              delete={deleteMyCard} />} />
            <Route path={'/myCards/addNewCard'} render={props=><EditCard
              props={props}
              type={`myCards`}
              add={addMyCard}
            />} />
          </MyCardsContext.Provider>
        </Switch>
        <Switch>
          <FindCardsContext.Provider value={findCards}>
            <Route exact path={'/findCards'} render={props=><MyCards type={`findCards`} delete={deleteMyCard} />} />
            <Route path={'/findCards/card/:number'} render={props=><EditCard
              props={props}
              type={`findCards`}
              edit={editMyCard}
              delete={deleteMyCard} />} />
            <Route path={'/findCards/addNewCard'} render={props=><EditCard
              props={props}
              type={`findCards`}
              add={addMyCard}
            />} />
          </FindCardsContext.Provider>
        </Switch>
      </main>
    </div>
  );
}

export default App;
