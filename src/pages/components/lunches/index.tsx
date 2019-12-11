import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Icon } from "antd";
import style from "./index.module.scss";
import history from "utils/history";

const todo = gql`
  {
    todolist @client {
      id
      title
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(todo);

  return (
    <div className={style.container}>
      <span className={style.title}>
        <span
          className={style.icon}
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon type="arrow-left" style={{ marginRight: "10px" }} />
        </span>
      </span>
      {loading && <Spin />}
      {error && <p>Error :(</p>}
      {data && (
        <ul>
          {data.todolist.map((_: any) => (
            <li key={_.id}>
              <a>{_.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
