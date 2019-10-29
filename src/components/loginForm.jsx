import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    loggingIn: false
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      this.setState({ loggingIn: true });
      await auth.login(data.email, data.password);
      // const { state } = this.props.location;
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors, loggingIn: false });
      }
      this.setState({ loggingIn: false });
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="m-3">
        <h1 className="display-3">LoginForm</h1>
        {this.state.loggingIn ? (
          <div className="col-md-3 bg">
            <div className="loader" id="loader-3"></div>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        )}
      </div>
    );
  }
}

export default LoginForm;
