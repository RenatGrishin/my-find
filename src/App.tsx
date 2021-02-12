import React, {useState} from "react";
import style from "./App.module.css";
import {Route, Switch} from "react-router-dom";
import Main from "./pages/main/main";
import MyCards from "./pages/myCards/myCards";
import EditCard from "./pages/cards/editCard";
import Chat from "./pages/chat/chat";
import ChatWithUser from "./pages/chat/chatWithUser";
import {userInfo} from "./store/user";
import {findCardsInfo} from "./store/findCards";
import {myCardsInfo} from "./store/myCards";
import {myChat} from "./store/chat";
import {allUsers} from "./store/allUsers.";
import {allNotice} from "./store/notice";

const defaultValue:{
  id:number, userID:number, cardName:string, cardNumb:string, cardMonth: number, cardYear: number, maybeOwner: number[], owner: number
}[] = [{ id: 0, userID:0, cardName: "", cardNumb: "", cardMonth: 0, cardYear: 0, maybeOwner: [0], owner: 0 }];
const chatDefaultValue:any = [ { id:500, userOneID: 1, userTwoID: 2, chat:[ {id:0, userID:1, msg:`hi`} ] } ];
const noticeDefaultValue:any = { lostMyCards: [ {id: 1000, cardID: 201} ], myFindsCards: [{id: 2000, cardID: 301}] };

export const MyCardsContext = React.createContext(defaultValue);
export const FindCardsContext = React.createContext(defaultValue);
export const ChatContext = React.createContext(chatDefaultValue);
export const NoticeContext = React.createContext(noticeDefaultValue);

function App(props:any) {
  const [user, setUser] = useState(userInfo);
  const [findCards, setFindCards] = useState(findCardsInfo);
  const [myCards, setMyCards] = useState(myCardsInfo)
  const [chat, setChat] = useState(myChat);
  const [users, setUsers] = useState(allUsers);
  const [notice, setNotice] = useState(allNotice);

  const authUser:number = user.id

  /* Сохраняем изменения в собственных картах */
  function editMyCard(cardEditInfo:{id:number, cardNumb:string, cardName:string, cardMonth:number, cardYear:number}, type:string) {
    let cardInfo:{
      id:number,
      userID: number,
      cardName:string,
      cardNumb:string,
      cardMonth: number,
      cardYear: number,
      maybeOwner: number[],
      owner: number
    } = {id: 0, userID:0, cardName: "", cardNumb: "", cardMonth: 0, cardYear: 0, maybeOwner: [], owner: 0};
    let arrIDCard:number;

    if(type === 'myCards'){
      arrIDCard =  myCards.findIndex(card => card.id === cardEditInfo.id);
      cardInfo = myCards[arrIDCard];
    } else if (type === 'findCards'){
      arrIDCard =  findCards.findIndex(card => card.id === cardEditInfo.id);
      cardInfo = findCards[arrIDCard];
    }

    cardInfo.userID = authUser;
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
        console.log(prev)
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
      userID:number,
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
          userID: authUser,
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
          userID: authUser,
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
  /* Отправить сообщение */
  function sendMessage(id:number, userID:number, msg:string){
    setChat( (prev) => {
      let chatWUser = prev.findIndex( ct => ct.id === id );

      let msgID = prev[chatWUser].chat.length;
      let sendMSG:{id:number, userID:number, msg:string} = {id:msgID, userID:userID, msg:msg};

      let newChat = [...prev];

      newChat[chatWUser].chat.push(sendMSG);

      return newChat;
    } )
  }
  /* Получить имя с кем чатимся */
  function getNameUserChat(id:number) {
    let member = users.find( (mbr:any) => mbr.id === id );
    if (member === undefined) {
      throw new TypeError('The value was promised to always be there!');
    }
    return member.userFIO;
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
          <NoticeContext.Provider value={notice}>
            <Route exact path={'/'} render={props=><Main props={props}
            />} />
          </NoticeContext.Provider>
        </Switch>
        <Switch>
          <MyCardsContext.Provider value={myCards}>
            <Route exact path={'/myCards'} render={props=><MyCards
              type={`myCards`}
              noticeCards={notice.lostMyCards}
              delete={deleteMyCard}
            />} />
            <Route path={'/myCards/card/:number'} render={props=><EditCard
              type={`myCards`}
              props={props}
              edit={editMyCard}
              delete={deleteMyCard}
            />} />
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
        <Switch>
          <ChatContext.Provider value={chat}>
            <Route exact path={'/chat'} render={props=><Chat users={users}/>} />
            <Route path={'/chat/:number'} render={props=><ChatWithUser
              props={props}
              users={users}
              meID={authUser}
              getNameUserChat={getNameUserChat}
              sendMessage={sendMessage}
            />} />
          </ChatContext.Provider>
        </Switch>
      </main>
    </div>
  );
}

export default App;
