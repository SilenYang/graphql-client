import React from "react";
import client from "fetch";
import { Route, Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import history from "utils/history";
import Lunches from "./components/lunches";
import Home from "./home";
import Main from "./main";

export default () => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        {/* <Lunches /> */}
        <Route exact path="/" component={Main} />
        <Route path="/todolist" component={Home} />
      </ApolloProvider>
    </Router>
  );
};
