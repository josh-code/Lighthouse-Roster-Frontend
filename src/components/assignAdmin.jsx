import React, { Component } from "react";
import Header from "./common/header";
import Dropdown from "./common/dropdown";
import Modal from "./common/modal";
import { getAllUsers, updateUserRoles } from "../services/userService";

class AssignAdmin extends Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const { data: users } = await getAllUsers();
    this.setState({ users });
  };

  userChange = user => {
    this.setState({ currentUser: user });
  };

  submit = async () => {
    let user = { ...this.state.currentUser };
    user.isAdmin ? (user.isAdmin = false) : (user.isAdmin = true);
    try {
      let result = await updateUserRoles([user]);
      if (result) this.props.history.push("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Header header="AssignAdmin" />
        <div className="p-3 col-7">
          <Dropdown
            data={this.state.users}
            onChange={user => this.userChange(user)}
            placeHolder="Select a User"
          />
        </div>
        {this.state.currentUser ? (
          <div className="ml-1 col-7">
            {this.state.currentUser.isAdmin ? (
              <Modal
                btnClass={"btn-danger"}
                item="item"
                label="UnassignUser"
                message={
                  "Unassign " + this.state.currentUser.name + " from Admin?"
                }
                onClick={() => this.submit()}
              />
            ) : (
              <Modal
                btnClass={"btn-success"}
                item="item"
                label="AssignUser"
                message={
                  "Assign " + this.state.currentUser.firstName + " as Admin?"
                }
                onClick={() => this.submit()}
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AssignAdmin;
