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
      this.setState({ roster, loaded: true });
    } catch (errors) {
      return this.setState({ errors, loaded: true });
    }
  }

  render() {
    if (this.state.errors) return <Redirect to="/NotFound" />;
    const { roster } = this.state;
    return (
      <div>
        {!this.state.loaded ? (
          <div className="col-md-3 bg">
            <div className="loader" id="loader-3"></div>
          </div>
        ) : (
          <RosterTable roster={roster} />
        )}
      </div>
    );
  }
}

export default Roster;
