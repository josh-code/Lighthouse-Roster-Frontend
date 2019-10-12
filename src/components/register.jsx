import React from "react";
import * as userService from "../services/userService";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";

class Register extends Form {
  state = {
    data: { email: "", password: "", firstName: "", lastName: "" },
    errors: {},
    registering: false
  };

  schema = {
    firstName: Joi.string()
      .required()
      .min(3)
      .max(25),
    lastName: Joi.string()
      .required()
      .min(3)
      .max(25),
    dob: Joi.date().required(),
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(225),
    phoneNo: Joi.string()
      .required()
      .min(10)
      .max(10),
    roles: Joi.array(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  };

  doSubmit = async () => {
    try {
      this.setState({ registering: true });
      const response = await userService.register(this.state.data);
      console.log(response.headers["x-auth-token"]);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/login";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors, registering: false });
      }
      this.setState({ registering: false });
    }
  };

  render() {
    return (
      <div>
        <h1 className="display-1">Register</h1>
        {!this.state.registering ? (
          <form onSubmit={this.handleSubmit} className="m-3">
            {this.renderInput("firstName", "First name")}
            {this.renderInput("lastName", "Last name")}
            {this.renderInput("phoneNo", "Phone No")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderDatePicker("dob", "Date of birth")}
            {this.renderButton("Register")}
          </form>
        ) : (
          <div className="col-md-3 bg">
            <div className="loader" id="loader-3"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Register;

//https://codewithmosh.com/courses/357787/lectures/5707047
