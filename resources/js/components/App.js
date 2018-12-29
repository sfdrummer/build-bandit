import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from "./Header";
import Projects from "./listings/Projects";
import Types from "./listings/Types";
import FieldTypes from "./listings/FieldTypes";
import Modules from "./listings/Modules";
import Project from "./project/Project";

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
          <Route path="/projects/:id" component={Project} />
          <Route path="/types" component={Types} />
          <Route path="/fieldtypes" component={FieldTypes} />
          <Route path="/modules" component={Modules} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
