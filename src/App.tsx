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
import {match} from "assert";

export const MyCardsContext = React.createContext({allCards:[{
  id: 0,
  cardName: "",
  cardNumb: "",
  cardMonth: 0,
  cardYear: 0,
  maybeOwner: [],
  owner: 0
}],
  editCard: {
    id: 0,
    cardName: "",
    cardNumb: "",
    cardMonth: 0,
    cardYear: 0,
    maybeOwner: [],
    owner: 0
  }}
);

function App(props:any) {
  const [user, setUser] = useState(userInfo);
  const [findCards, setFindCards] = useState(findCardsInfo);
  const [lostCards, setLostCards] = useState(lostCardsInfo);
  const [myCards, setMyCards] = useState(myCardsInfo)


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
            <Route exact path={'/myCards'} component={()=><MyCards/>} />
            <Route path={'/myCards/card/:number'} render={props=><EditCard props={props}/>} />
          </MyCardsContext.Provider>
        </Switch>
      </main>
    </div>
  );
}

export default App;
