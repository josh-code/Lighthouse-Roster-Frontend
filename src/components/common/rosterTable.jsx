import React, { Component } from "react";
import { renderSmily } from "../../services/statusService";
import { formatDate } from "./../../utils/dateFormatter";

class RosterTable extends Component {
  render() {
    const { roster } = this.props;
    return (
      <div className="card m-3">
        <div>
          <h1 className="display-4 ml-2 ">
            {formatDate(new Date(roster.date))}
          </h1>
        </div>
        <table className="table table-sm table-striped">
          <thead className="thead-primary">
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {roster.data.map((item, index) => (
              <tr key={item.role + item.user._id + index.toString()}>
                <td key={item.role + item.user._id + index.toString()}>
                  {item.role}
                </td>
                <td key={roster.date + item.user.firstName}>
                  {item.user.firstName}
                </td>
                <td key={roster.date + item.status}>
                  {renderSmily(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RosterTable;
