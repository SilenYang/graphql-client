import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GETUSER_LIST = gql`
  {
    userInfo(id: 1) {
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

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }
  return <div>12</div>;
};
