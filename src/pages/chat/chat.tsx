import React, {useContext} from "react";
import {ChatContext} from "../../App";
import {Link} from "react-router-dom";

function Chat(props:any) {
  let chat = useContext(ChatContext);

  function chatList(id:number, userTwoID:number) {
    let chatUser = props.users.find( (user:any) =>user.id === userTwoID);
    return<div key={id}>
      <Link to={`/chat/${id}`}>{chatUser.userFIO}</Link>
    </div>
  }

  return<div>
    <h3><Link to={`/`}>Чат</Link></h3>
    <div>
      {chat.map((arr:any) => chatList(arr.id, arr.userTwoID))}
    </div>
  </div>
}

export default Chat;