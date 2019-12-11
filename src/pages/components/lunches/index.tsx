import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Spin } from "antd";
import style from "./index.module.scss";

const todo = gql`
  query {
    todolist @cache
  }
`;

export default () => {
  const { loading, error, data } = useQuery(todo);

  return (
    <div className={style.container}>
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
