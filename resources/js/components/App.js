import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from "./Header";
import Projects from "./listings/Projects";
import Types from "./listings/types";

const client = new ApolloClient({
  uri: "/graphql"
});

const App = props => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/" component={Projects} />
          <Route path="/types" component={Types} />
          {/*        <Route path="/fields" component={Fields} />
  */}
        </div>
      </Router>
    </ApolloProvider>
  );
};

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
