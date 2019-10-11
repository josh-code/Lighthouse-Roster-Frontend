import React, { Component } from "react";
import { getUserRosters, updateUserRoster } from "../services/rosterService";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import auth from "../services/authService";
import { formatDate } from "./../utils/dateFormatter";
class UserDashboard extends Component {
  state = {
    user: { firstName: "user" },
    modal: {
      show: false,
      title: "Attention!!",
      message: "hi",
      firstBtn: {
        className: "secondary",
        label: "close"
      },
      secondBtn: {
        className: "primary",
        label: "btn",
        onClick: {
          selection: "accept"
        }
      },
      roster: {}
    }
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    const { data: rosters } = await getUserRosters(user._id);
    this.setState({ user, rosters });
  }

  acceptRequest = async roster => {
    const rosters = [...this.state.rosters];
    const modal = { ...this.state.modal };
    modal.show = false;
    const index = rosters.indexOf(roster);
    console.log(rosters, index);
    rosters[index] = { ...rosters[index] };
    rosters[index].role.status = "accepted";
    let result = await updateUserRoster(this.state.user._id, rosters[index]);
    if (!result) {
      rosters[index].role.status = "pending";
    }
    this.setState({ rosters, modal });
  };

  rejectRequest = async roster => {
    const rosters = [...this.state.rosters];
    const modal = { ...this.state.modal };
    modal.show = false;
    const index = rosters.indexOf(roster);
    rosters[index] = { ...rosters[index] };
    rosters[index].role.status = "declined";
    let result = await updateUserRoster(this.state.user._id, rosters[index]);
    if (!result) {
      rosters[index].role.status = "pending";
    }
    this.setState({ rosters, modal });
  };

  openModal = (selection, roster) => {
    let modal = { ...this.state.modal };
    modal.show = true;
    modal.roster = roster;
    if (selection === "accept") {
      modal.title = `Accept for ${formatDate(new Date(roster.date))} ?`;
      modal.message = "Are you sure? You cannot backout later.";
      modal.secondBtn.className = "primary";
      modal.secondBtn.label = "Accept";
      modal.secondBtn.onClick.selection = "accept";
    } else {
      modal.title = `Decline for ${formatDate(new Date(roster.date))} ?`;
      modal.message =
        "Seriously? What other plans do you have? This cannot be changed later.";
      modal.secondBtn.className = "danger";
      modal.secondBtn.label = "Decline";
      modal.secondBtn.onClick.selection = "decline";
    }
    this.setState({ modal });
  };

  renderButtons = roster => {
    switch (roster.role.status) {
      case "pending":
        return (
          <div className="container">
            <div className="row">
              <button
                className=" btn btn-primary w-100  btn-lg m-1"
                onClick={() => this.openModal("accept", roster)}
              >
                Accept
              </button>
            </div>
            <div className="row">
              <button
                className=" btn btn-danger w-100  btn-lg m-1"
                onClick={() => this.openModal("decline", roster)}
              >
                Decline
              </button>
            </div>
          </div>
        );
      case "accepted":
        return (
          <div className="container bg-success text-white rounded  align-self-center">
            <div className="text-center p-1 pt-3">
              <p className="text-center">Accepted</p>
            </div>
          </div>
        );
      case "declined":
        return (
          <div className="container bg-danger text-white rounded align-self-center">
            <div className="text-center p-1 pt-3">
              <p className="text-center">Declined</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="container">
            <div className="row">
              <Modal
                btnClass="btn-primary"
                item="item"
                label="Accept"
                message="Are you sure? You cannot backout later."
                onClick={() => this.acceptRequest(roster)}
              />
            </div>
            <div className="row">
              <Modal
                btnClass="btn-danger"
                item="item"
                label="Reject"
                message="Seriously? What other plans do you have? This cannot be changed later."
                onClick={() => this.rejectRequest(roster)}
              />
            </div>
          </div>
        );
    }
  };

  render() {
    const handleClose = (selection, roster) => {
      if (selection) {
        if (selection === "accept") {
          return this.acceptRequest(roster);
        } else {
          return this.rejectRequest(roster);
        }
      }
      let modal = { ...this.state.modal };
      modal.show = false;
      this.setState({ modal });
    };
    // const { data } = this.state;
    return (
      <div>
        <div className="container  m-2">
          <div className="row justify-content-between">
            <div className="col-4 align-self-end">
              <h1 className="display-4 ">Dashboard</h1>
            </div>
            <div className="col-4  align-self-end">
              <h6 className="display-6">{this.state.user.firstName}</h6>
            </div>
          </div>
        </div>
        <div className="row m-1">
          {this.state.rosters &&
            this.state.rosters.map(roster => (
              <div
                key={roster._id + roster.role.role}
                className="col-sm-6 mt-2 "
              >
                <div className="card">
                  <div className="m-3">
                    <div className="row justify-content-between">
                      <div className="m-2">
                        <h4 className="card-title">
                          {formatDate(new Date(roster.date))}
                        </h4>
                        <p className="card-text">{roster.role.role}</p>

                        <Link
                          className="btn btn-primary btn-block btn-sm rounded"
                          to={"/roster/" + roster._id}
                        >
                          View Roster
                        </Link>
                      </div>
                      <div className="m-2 text-right">
                        {this.renderButtons(roster)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {!this.state.rosters && (
            <h3 className="h4 m-4">Not rostered for upcoming Sundays</h3>
          )}
          <Modal show={this.state.modal.show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modal.message}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Close
              </Button>
              <Button
                variant={this.state.modal.secondBtn.className}
                onClick={() =>
                  handleClose(
                    this.state.modal.secondBtn.onClick.selection,
                    this.state.modal.roster
                  )
                }
              >
                {this.state.modal.secondBtn.label}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
