import React, { Component } from "react";
import Card from "component/card";
import Header from "component/header";
import "./style.css";
import Button from "component/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Signup, Update, currentUser } from "store/action/user";
import { toast } from "react-toastify";

const imageType = ["image/jpeg", "image/png", "image/jpg"];
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      profile: "",
    };
  }
  componentDidMount() {
    const { name, email, phone } = this.props.user.currentUser;
    this.setState({ name, email, phone });
  }

  getBase64 = (e) => {
    console.log("file");
    let file = e.target.files[0];
    if (file && imageType.includes(file.type)) {
      if (file.size < 500000) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.setState({ profile: reader.result });
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      } else {
        toast.warning("profile picture must be less than 500kb.");
      }
    } else {
      toast.warning("profile picture must be png, jpeg, jpg.");
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.update({ ...this.props.user, data: this.state });
  };
  render() {
    const { name, email, phone } = this.state;
    const { loading } = this.props.user;
    return (
      <Card>
        <Header title="Edit Profile" />
        <div>
          <Button
            onClick={() => {
              this.props.history.push("/");
            }}
            txt={"Back"}
          />
        </div>
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
          <div className="form-group">
            <label>Profile</label>
            <input
              onChange={this.getBase64}
              name="file"
              className="input-box"
              type="file"
              placeholder="Select pofile"
              accept=".png, .jpg, .jpeg"
              required
            />
          </div>
          <div>
            <Button
              disable={loading}
              txt={loading ? "loading..." : "Update"}
              type="submit"
            />
          </div>
        </form>
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
    update: (data) => {
      return Update(data, dispatch);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
