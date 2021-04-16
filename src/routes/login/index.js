import React, { Component } from "react";
import Card from "component/card";
import Header from "component/header";
import "./style.css";
import Button from "component/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Login as Signin } from "store/action/user";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "jack@gmail.com",
      password: "1234",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login({ ...this.props.user, data: this.state });
  };
  render() {
    const { email, password } = this.state;
    const { loading } = this.props.user;
    return (
      <Card>
        <Header title="Login" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleChange}
              value={email}
              className="input-box"
              type="text"
              placeholder="Enter Email/Phone number"
              required
              name="email"
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              onChange={this.handleChange}
              value={password}
              name="password"
              className="input-box"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <Button
              disable={loading}
              txt={loading ? "loading..." : "Submit"}
              type="submit"
            />
          </div>
        </form>
        <div className="m-10">
          <Link to="/signup">Create New Account</Link>
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
    login: (data) => {
      return Signin(data, dispatch);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
