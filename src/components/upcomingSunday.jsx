import React, { Component } from "react";
import RosterTable from "./common/rosterTable";
import { getUpcomingSunday } from "../services/rosterService";

class UpcomingSunday extends Component {
  state = {
    preload: "Loading..."
  };

  componentWillMount() {
    this.populateRoster();
  }

  async populateRoster() {
    try {
      const roster = await getUpcomingSunday();
      this.setState({ loaded: true, roster: roster.data });
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        return this.setState({ loaded: true, empty: true });
      }
      return this.setState({
        loaded: true,
        preload: "Network Problem!!",
        empty: true
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container  rounded">
          <div className="row justify-content-between">
            <div className="col-4 mt-1">
              <h1 className="display-4 ">Upcoming</h1>
            </div>
          </div>
        </div>
        {this.state.roster && <RosterTable roster={this.state.roster} />}
        {this.state.empty && !this.state.roster && (
          <h3 className="h4 m-4">
            Roster for upcoming Sunday will be up shortly
          </h3>
        )}
        {!this.state.loaded && (
          <div className="col-md-3 bg">
            <div className="loader" id="loader-3"></div>
          </div>
        )}
      </div>
    );
  }
}

export default UpcomingSunday;
