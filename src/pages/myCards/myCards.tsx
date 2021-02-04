import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {MyCardsContext} from "../../App";

function MyCards(props:any) {
  const myCard =  useContext(MyCardsContext);

  function getMyCards(id:number, cardNumb:string) {
    return <div key={id}>
      <Link to={`/myCards/card/${id}`}>
        <img src={"./"} alt={"logo"} />
        <p>{cardNumb}</p>
      </Link>
      <div>X</div>
    </div>
  }

  return<div>
    <h3><Link to={`/`}>Найденные карты</Link></h3>
    <div>
      {myCard.allCards.map(card=>getMyCards(card.id, card.cardNumb))}
    </div>
  </div>
}

export default MyCards;