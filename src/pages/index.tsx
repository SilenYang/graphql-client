import React from "react";
import "./App.css";
import client from "fetch";
import { ApolloProvider } from "@apollo/react-hooks";
import Lunches from "./components/lunches";
import { Button } from "antd";

const Main: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button>12</Button>
          <Lunches />
        </header>
      </div>
    </ApolloProvider>
  );
};

export default Main;
