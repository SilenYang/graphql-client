import React from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className={style.container}>
      <div className={style.title}>项目列表</div>
      <Link to="/todolist" className={style.item}>
        待办列表
      </Link>
      <br />
      <Link to="/todolist" className={style.item}>
        待办列表
      </Link>
    </div>
  );
};
