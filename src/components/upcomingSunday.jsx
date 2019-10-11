import React, { Component } from "react";
import RosterTable from "./common/rosterTable";
import { getUpcomingSunday } from "../services/rosterService";

class UpcomingSunday extends Component {
  state = {};

  componentWillMount() {
    this.populateRoster();
  }

  async populateRoster() {
    const roster = await getUpcomingSunday();
    console.log(roster);
    this.setState({ roster: roster.data });
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
        {this.state.roster ? (
          <RosterTable roster={this.state.roster} />
        ) : (
          <h3 className="h4 m-4">
            Roster for upcoming Sunday will be up shortly
          </h3>
        )}
      </div>
    );
  }
}

export default UpcomingSunday;
