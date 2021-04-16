import React, { Component } from "react";
import { connect } from "react-redux";
import { Logout, currentUser } from "store/action/user";
import Card from "component/card";
import Header from "component/header";
import "./style.css";
import Button from "component/button";

class Home extends Component {
  render() {
    const { loading, currentUser = {} } = this.props.user;
    const { name, email, phone, id, profile } = currentUser;
    console.log("profile", profile)
    return (
      <Card>
        <Header title="Profile" />
        <div className="form-group">
          <img src={profile} alt="" width={50} height={50} />
        </div>
        <div className="form-group">Name: {name}</div>
        <div className="form-group">Email: {email}</div>
        <div className="form-group">Phone: {phone}</div>
        <div>
          <Button
            onClick={() => {
              this.props.history.push("/profile");
            }}
            txt={"Edit Profile"}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              this.props.logout();
            }}
            disable={loading}
            txt={"logout"}
          />
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(currentUser());
    },
    logout: () => {
      return Logout(dispatch);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
