import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { Icon } from "antd";

interface IProps {}

export default function Custom(props: IProps) {
  const [] = useState();

  useEffect(() => {
    // TODO...
  }, []);

  return (
    <div className={style.container}>
      <div className={style.title}>
        TodoList
        <span className={style.icon}>
          <Icon type="plus-circle" />
        </span>
      </div>
    </div>
  );
}
