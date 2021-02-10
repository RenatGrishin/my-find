import React, {useContext, useState} from "react";
import {ChatContext} from "../../App";
import {Link} from "react-router-dom";

function ChatWithUser(props:any) {
  const cardIdURL = Number(props.props.match.params.number);
  let chat = useContext(ChatContext);
  let [sendMessage, setSendMessage] = useState('')

  let chatUser = chat.find( (chatMe:any) =>chatMe.id === cardIdURL );

  debugger
  function messages(msg:{id:number, userID:number, msg:string}) {
    return<div>
      <p>{msg.msg}</p>
    </div>
  }

  function send() {
    props.sendMessage(cardIdURL, 1, sendMessage)
    setSendMessage('');
  }

  return<div>
    <h3>Чат c ...</h3>
    <div>
      { chatUser.chat.map( (msg:any) => messages(msg) ) }
    </div>
    <div>
      <input type={`text`} onChange={ (e)=>{setSendMessage(e.target.value)}} value={sendMessage} />
      <input type={`submit`} onClick={ ()=>{ send() } } value={`Отправить`} />
    </div>
  </div>
}

export default ChatWithUser;