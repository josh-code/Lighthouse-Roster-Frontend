import React, { Component } from "react";
import { getAllUsers, updateUserRoles } from "../services/userService";
import Dropdown from "./common/dropdown";
import Header from "./common/header";
import Modal from "./common/modal";
import _ from "lodash";
import { getRoles } from "../services/rosterService";

class AssignRoles extends Component {
  state = {
    users: [],
    saveChanges: false,
    editedUsers: [],
    eligibleRoles: []
  };

  async componentDidMount() {
    await this.getUsers();
    this.getRoles();
  }

  getUsers = async () => {
    const { data: users } = await getAllUsers();
    this.setState({ users });
  };

  getRoles = () => {
    const roles = getRoles();
    let eligibleRoles = [];
    roles.map(role => eligibleRoles.push(role));
    this.setState({ roles, eligibleRoles });
  };

  userChange = user => {
    let eligibleRoles = this.getEligibleRoles(user);
    this.setState({ currentUser: user, eligibleRoles });
  };

  unassign = role => {
    let user = { ...this.state.currentUser };
    let index = _.indexOf(user.roles, role);
    user.roles.splice(index, 1);
    let eligibleRoles = this.getEligibleRoles(user);
    let editedUsers = this.AddEditedUsers(user);
    this.setState({
      currentUser: user,
      saveChanges: true,
      eligibleRoles,
      editedUsers
    });
  };

  assign = role => {
    let user = { ...this.state.currentUser };
    user.roles.push(role);
    let eligibleRoles = this.getEligibleRoles(user);
    let editedUsers = this.AddEditedUsers(user);
    this.setState({
      currentUser: user,
      saveChanges: true,
      eligibleRoles,
      editedUsers
    });
  };

  getEligibleRoles = user => {
    let roles = this.state.roles;
    let eligibleRoles = _.difference(roles, user.roles);
    return eligibleRoles;
  };

  AddEditedUsers = user => {
    let editedUsers = this.state.editedUsers;
    if (!editedUsers.some(user1 => user1._id === user._id)) {
      editedUsers.push(user);
    } else {
      editedUsers.map((user1, index) => {
        if (user1._id === user._id) {
          return (editedUsers[index] = user);
        }
      });
    }
    console.log(editedUsers);
    return editedUsers;
  };

  submit = async () => {
    let result = await updateUserRoles(this.state.editedUsers);
    if (result) this.props.history.push("/admin");
  };

  render() {
    return (
      <div>
        <Header header="AssignRoles" />
        <div className="p-3 col-7">
          <Dropdown
            data={this.state.users}
            onChange={user => this.userChange(user)}
            placeHolder="Select a User"
          />
        </div>
        {this.state.currentUser ? (
          <div className="ml-1 col-7">
            <Dropdown
              data={this.state.eligibleRoles}
              onChange={role => this.assign(role)}
              placeHolder="Assign a Role"
            />
          </div>
        ) : (
          ""
        )}
        {this.state.currentUser
          ? this.state.currentUser.roles.map(role => (
              <div key={role + Math.random().toString()} className="card m-3">
                <div
                  key={role + Math.random().toString()}
                  className="card-body row justify-content-between p-3 "
                >
                  <div key={role + Math.random().toString()} className="col">
                    {role}
                  </div>
                  <div
                    key={role + Math.random().toString()}
                    className="col text-right"
                  >
                    <i
                      key={role + Math.random().toString()}
                      className="far fa-trash-alt"
                      onClick={() => this.unassign(role)}
                    />
                  </div>
                </div>
              </div>
            ))
          : ""}
        {this.state.saveChanges ? (
          <div className="mt-5">
            <Modal
              btnClass={"btn-primary justify-content-center  btn-lg btn-block "}
              // disabled={this.state.SubmitButtonStatus}
              item="item"
              label="SaveChanges"
              message={"Save changes for user Roles?"}
              onClick={() => this.submit()}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AssignRoles;
