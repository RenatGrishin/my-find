import React, {useContext} from "react";
import style from "./main.module.css";
import {Link} from "react-router-dom";
import {NoticeContext} from "../../App";

function Main(props:any) {
  let notice = useContext(NoticeContext);

  function getNoticeSum(noticeArr:any) {
    return <div className={style.notice}>
      {noticeArr.length}
    </div>
  }

  return <div className={style.main}>
    <div className={style.my_stuff}>
      <Link to={`/myCards`}>Мои карты</Link>
      { (notice.lostMyCards.length > 0) ? getNoticeSum(notice.lostMyCards) : false }
    </div>
    <div className={style.i_find}>
      <Link to={`/findCards`}>Я нашел</Link>
      { (notice.myFindsCards.length > 0) ? getNoticeSum(notice.lostMyCards) : false }
    </div>
    <div className={style.chat}>
      <Link to={`/chat`}>Чат</Link>
    </div>
  </div>
}

export default Main;