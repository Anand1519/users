import React, { Component } from "react";
import Card from "component/card";
import Header from "component/header";
import "./style.css";
import Button from "component/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Signup } from "store/action/user";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "jack",
      email: "jack@gmail.com",
      phone: "12345",
      password: "1234",
      cpassword: "1234",
      isPassSame: true,
    };
  }

  getBase64(e) {
    console.log("file", e.target.files[0]);
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      console.log("reader.result: ", reader.result);
      document = reader.result;
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    const { password, cpassword } = this.state;
    let isPassSame = password === cpassword;
    if (name === "cpassword") isPassSame = value === password;
    if (name === "password") isPassSame = value === cpassword;
    this.setState({
      [name]: value,
      isPassSame,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.isPassSame) {
      console.log(this.props.signup({ ...this.props.user, data: this.state }));
    }
  };
  componentDidUpdate(preProps) {
    if (this.props.user.signup) {
      this.props.history.push("/");
    }
  }
  render() {
    const { name, email, phone, password, cpassword, isPassSame } = this.state;
    const { loading } = this.props.user;
    return (
      <Card>
        <Header title="SignUp" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={this.handleChange}
              value={name}
              className="input-box"
              type="text"
              placeholder="Enter Name"
              required
              name="name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleChange}
              value={email}
              className="input-box"
              type="email"
              placeholder="Enter Email"
              required
              name="email"
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              onChange={this.handleChange}
              value={phone}
              className="input-box"
              type="number"
              placeholder="Enter Mobile Number"
              required
              name="phone"
            />
          </div>
          {/* <input
              onChange={this.getBase64}
              name="password"
              className="input-box"
              type="file"
              placeholder="Select pofile"
              accept=".png, .jpg, .jpeg"
              required
            />
          </div> */}
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handleChange}
              value={password}
              name="password"
              className="input-box"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              onChange={this.handleChange}
              value={cpassword}
              name="cpassword"
              className="input-box"
              type="password"
              placeholder="Enter Confirm Password"
              required
            />
            {!isPassSame && (
              <div className="error">
                Password and Confirm Password must be same
              </div>
            )}
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
          <Link to="/">Login</Link>
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
    signup: (data) => {
      return Signup(data, dispatch);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
