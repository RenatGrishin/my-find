import React from "react";

function EditCard (props:any){
  console.log(props)
  return<div>
    <h3>Назад</h3>
    <div>
      <p>Номер:</p><input type={`text`} defaultValue={`4654 6454 4754 4445`}/>
      <p>Имя Фамилия: </p>
      <p>Месяц: </p>
      <p>Год: </p>
    </div>
  </div>
}

export default EditCard;