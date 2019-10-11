import React from "react";
import * as userService from "../services/userService";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";

class Register extends Form {
  state = {
    data: { email: "", password: "", firstName: "", lastName: "" },
    errors: {}
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
      const response = await userService.register(this.state.data);
      console.log(response.headers["x-auth-token"]);
      auth.loginWithJwt(response.headers["x-auth-token"]);

      window.location = "/login";
      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="display-1">Register</h1>
        <form onSubmit={this.handleSubmit} className="m-3">
          {this.renderInput("firstName", "FirstName")}
          {this.renderInput("lastName", "lastName")}
          {this.renderInput("phoneNo", "PhoneNo")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderDatePicker("dob", "dateOfBirth")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;

//https://codewithmosh.com/courses/357787/lectures/5707047
