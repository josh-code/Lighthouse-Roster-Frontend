import React, { Component } from "react";
import { formatDate } from "./../utils/dateFormatter";
import { getRoster, updateRoster } from "./../services/rosterService";
import { getAllUsers, filterByRole } from "../services/userService";
import Header from "./common/header";
import Modal from "./common/modal";
import Dropdown from "./common/dropdown";
import { renderSmily } from "../services/statusService";

class UpdateRosterById extends Component {
  state = {
    roster: {
      data: [],
      date: ""
    },
    users: []
  };

  componentDidMount() {
    this.getRoster();
    this.getUsers();
  }

  async getRoster() {
    let rosterId = this.props.match.params.id;
    let { data: roster } = await getRoster(rosterId);
    let originalRosterStatus = roster.data.map(data => {
      return { id: data.user ? data.user._id : null, status: data.status };
    });
    this.setState({ roster, originalRosterStatus });
  }

  async getUsers() {
    let { data: users } = await getAllUsers();
    this.setState({ users });
  }

  editRoster = (person, index) => {
    let roster = { ...this.state.roster };
    let originalRoster = { ...this.state.originalRosterStatus };
    if (originalRoster[index]) {
      if (originalRoster[index].id === person.id) {
        roster.data[index].status = originalRoster[index].status;
        console.log("same user");
      } else {
        roster.data[index].status = "pending";
      }
    } else {
      roster.data[index].status = "pending";
    }
    roster.data[index].user = person.firstName === "blank" ? {} : person;
    this.setState({ roster });
    console.log(this.state.roster);
    console.log(this.state.originalRosterStatus);
  };

  changeStatus = (status, index) => {
    let roster = { ...this.state.roster };
    switch (status) {
      case "pending":
        roster.data[index].status = "accepted";
        break;
      case "accepted":
        roster.data[index].status = "declined";
        break;
      case "declined":
        roster.data[index].status = "pending";
        break;
      default:
        roster.data[index].status = "pending";
    }
    this.setState({ roster });
  };

  submit = async () => {
    try {
      let result = await updateRoster(this.state.roster);
      if (result) this.props.history.push("/admin");
    } catch (err) {}
  };

  render() {
    return (
      <div>
        <Header header="UpdateRoster" />
        <h3 className="h3 m-4">
          {formatDate(new Date(this.state.roster.date))}
        </h3>
        <div className="constainer m-2 mt-4">
          {this.state.roster.data.map((roles, index) => (
            <div
              key={roles.role + Math.random().toString()}
              className="row align-items-center mt-3"
            >
              <div
                key={roles.role + Math.random().toString()}
                className="col-7"
              >
                <Dropdown
                  key={roles.role + Math.random().toString()}
                  onChange={person => this.editRoster(person, index)}
                  data={filterByRole(this.state.users, roles.role)}
                  value={roles.user && roles.user.firstName}
                />
              </div>
              <div
                key={roles.role + Math.random().toString()}
                onClick={() => this.changeStatus(roles.status, index)}
              >
                {renderSmily(roles.status)}
              </div>
              <div key={roles.role + Math.random().toString()} className="col">
                {roles.role}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Modal
            btnClass={
              "btn-primary justify-content-center  btn-lg btn-block "
              // this.state.SubmitButtonStatus.status
            }
            // disabled={this.state.SubmitButtonStatus}
            item="item"
            label="Update"
            message={
              "Update Roster for " +
              formatDate(new Date(this.state.roster.date)) +
              " ?"
            }
            onClick={() => this.submit()}
          />
        </div>
      </div>
    );
  }
}

export default UpdateRosterById;
