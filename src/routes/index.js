import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import Home from "./home";
import { connect } from "react-redux";
import EditProfile from "./edit-profile";

const PrivateRoute = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/profile" exact component={EditProfile} />
  </Router>
);
class Routes extends Component {
  render() {
    const { auth } = this.props.user;
    console.log("auth", auth);
    return (
      <Router>
        <Switch>
          {auth ? (
            <PrivateRoute />
          ) : (
            <>
              <Route path="/" exact render={(props) => <Login {...props} />} />
              <Route path="/signup" render={(props) => <SignUp {...props} />} />
            </>
          )}
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Routes);
