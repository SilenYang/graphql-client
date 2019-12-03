import React from "react";
import client from "fetch";
import { ApolloProvider } from "@apollo/react-hooks";
import Lunches from "./components/lunches";
import Home from "./home";

const Main: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default Main;
