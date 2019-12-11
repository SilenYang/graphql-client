import React from "react";
import client from "fetch";
import { Route, Router } from "react-router-dom";
import history from "utils/history";
import Lunches from "./components/lunches";
import Home from "./home";
import Main from "./main";
import { ApolloProvider } from "@apollo/react-hooks";

export default () => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        {/* <Lunches /> */}
        <Route exact path="/" component={Main} />
        <Route path="/todolist" component={Home} />
        <Route path="/todocache" component={Home} />
      </ApolloProvider>
    </Router>
  );
};
