import style from "./App.module.css"
import Main from "./pages/main/main";
import {Route, Switch} from "react-router-dom";
import MyCards from "./pages/myCards/myCards";
import React, {useState} from "react";
import {userInfo} from "./store/user";
import {findCardsInfo} from "./store/findCards";
import {lostCardsInfo} from "./store/lostCards";
import {myCardsInfo} from "./store/myCards";
import EditCard from "./pages/cards/editCard";
import addNewCard from "./pages/cards/addNewCard";

export const MyCardsContext = React.createContext([{
  id: 0,
  cardName: "",
  cardNumb: "",
  cardMonth: 0,
  cardYear: 0,
  maybeOwner: [0],
  owner: 0
}]);

function App(props:any) {
  const [user, setUser] = useState(userInfo);
  const [findCards, setFindCards] = useState(findCardsInfo);
  const [lostCards, setLostCards] = useState(lostCardsInfo);
  const [myCards, setMyCards] = useState(myCardsInfo)

  /* Сохраняем изменения в собственных картах */
  function editMyCard(cardEditInfo:{id:number, cardNumb:string, cardName:string, cardMonth:number, cardYear:number}) {
    setMyCards( (prev) => {
      let arrIDCard =  myCards.findIndex(card => card.id === cardEditInfo.id);
      let cardInfo = prev[arrIDCard];

      cardInfo.cardNumb = cardEditInfo.cardNumb;
      cardInfo.cardName = cardEditInfo.cardName;
      cardInfo.cardMonth = cardEditInfo.cardMonth;
      cardInfo.cardYear = cardEditInfo.cardYear;
      cardInfo.maybeOwner = [0];
      cardInfo.owner = 0;

      let cards = [...prev];
      cards[arrIDCard] = cardInfo;

      return cards;
    } )
  }
  /* Удаляем свою карточку */
  function deleteMyCard(id:number) {
    let newMyCardsList:{
      id:number,
      cardName:string,
      cardNumb:string,
      cardMonth: number,
      cardYear: number,
      maybeOwner: number[],
      owner: number
    }[] = [];

    myCards.map( (card)=>{ if (card.id !== id) { newMyCardsList.push(card) } } )

    setMyCards((prev) => {
      prev = newMyCardsList;
      return prev;
    })
  }
  /* Добавить новую собственную карту */
  function addMyCard(cardEditInfo:{id:number, cardNumb:string, cardName:string, cardMonth:number, cardYear:number}) {
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
            <Route exact path={'/myCards'} render={()=><MyCards delete={deleteMyCard} />} />
            <Route path={'/myCards/card/:number'} render={props=><EditCard
              props={props}
              edit={editMyCard}
              delete={deleteMyCard} />} />
            <Route path={'/myCards/addNewCard'} render={props=><EditCard
              props={props}
              add={addMyCard}
            />} />
          </MyCardsContext.Provider>
        </Switch>
      </main>
    </div>
  );
}

export default App;
