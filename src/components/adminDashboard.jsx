import React, { Component } from "react";
import Header from "./common/header";
import { Link } from "react-router-dom";
import auth from "../services/authService";
class AdminDashboard extends Component {
  state = { user: { firstName: "user" } };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <div className="m-1">
          <Header header={"Admin"} userName={this.state.user.firstName} />
        </div>
        <div className="card m-3">
          <div className="card-body">
            <h3 className="card-title">Roster actions</h3>
            <Link to="/admin/roster/createRoster" className="btn btn-primary">
              Roster a sunday
            </Link>
            <br />
            <Link
              to="/admin/roster/updateRoster"
              className=" btn btn-info mt-3"
            >
              Edit a roster
            </Link>
          </div>
        </div>
        <div className="card m-3 ">
          <div className="card-body">
            <h3 className="card-title">User actions</h3>
            <Link to="/admin/user/assignRoles" className="btn btn-primary">
              Assign roles to user
            </Link>
          </div>
        </div>
        <div className="card m-3">
          <div className="card-body">
            <h3 className="card-title">Admin actions</h3>
            <Link to="/admin/user/assignAdmin" className="btn btn-info">
              Assign/unassign admin role
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
