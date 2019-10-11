import React, { Component } from "react";
import RosterTable from "./common/rosterTable";

import { getRoster } from "../services/rosterService";
// import auth from "../services/authService";
// import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
// Joi.objectId = require("joi-objectid")(Joi);

class Roster extends Component {
  state = {
    roster: {
      data: [],
      date: new Date()
    }
  };

  componentDidMount() {
    this.populateRoster();
  }

  async populateRoster() {
    // validator({id :this.props.match.params.id});
    // const { error } = validator(req.body);
    // if (auth.getCurrentUser()) return <Redirect to="/" />;
    // const { data: roster } = await getRoster(this.props.match.params.id);
    try {
      const { data: roster } = await getRoster(this.props.match.params.id);
      this.setState({ roster });
    } catch (errors) {
      return this.setState({ errors });
    }
  }

  render() {
    if (this.state.errors) return <Redirect to="/NotFound" />;
    const { roster } = this.state;
    return <RosterTable roster={roster} />;
  }
}

export default Roster;
