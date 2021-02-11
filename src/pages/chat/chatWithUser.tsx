import React, {useContext, useState} from "react";
import {ChatContext} from "../../App";
import css from "./chat.module.css"
import {Link} from "react-router-dom";

function ChatWithUser(props:any) {
  const cardIdURL = Number(props.props.match.params.number);
  let chat = useContext(ChatContext);
  let [sendMessage, setSendMessage] = useState('')

  let chatUser = chat.find( (chatMe:any) =>chatMe.id === cardIdURL );

  function messages(msg:{id:number, userID:number, msg:string}) {
    return<div className={css.msg_block} key={msg.id}>
      <div className={ props.meID === msg.userID ? css.me : css.companion }><p>{msg.msg}</p></div>
    </div>
  }

  function send() {
    props.sendMessage(cardIdURL, 1, sendMessage)
    setSendMessage('');
  }

  return<div className={css.chat_area}>
    <div className={css.chat_box}>
      <h3><Link to={`/chat`}>Чат c {props.getNameUserChat(chatUser.userTwoID)}</Link></h3>
      <div>
        { chatUser.chat.map( (msg:any) => messages(msg) ) }
      </div>
    </div>
    <div className={css.send_text_area}>
      <textarea onChange={ (e)=>{setSendMessage(e.target.value)}} value={sendMessage} />
      <input type={`submit`} onClick={ ()=>{ send() } } value={`Отправить`} />
    </div>
  </div>
}

export default ChatWithUser;