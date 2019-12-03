import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Spin } from "antd";
import style from "./index.module.scss";

const GETUSER_INFO = gql`
  query {
    userInfo($id: String!) {
      id
      name
      age
      phone
      avatar
      country
      sex
      password
    }
  }
`;
const GETUSER_LIST = gql`
  query {
    userLists {
      id
      name
      age
      phone
      avatar
      country
      sex
      password
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GETUSER_LIST);
  console.log(data);

  return (
    <div className={style.container}>
      {loading && <Spin />}
      {error && <p>Error :(</p>}
      {data && (
        <ul>
          {data.userLists.map((_: any) => (
            <li key={_.id}>
              <a>{_.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
