import React, { Component } from "react";
// import Modal from "./common/modal";
import Header from "./common/header";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { formatDate } from "./../utils/dateFormatter";
import { getAllRosters, deleteRoster } from "./../services/rosterService";

class UpdateRoster extends Component {
  state = {
    rosters: [],
    show: false,
    model: {}
  };

  async componentDidMount() {
    await this.getRosters();
  }

  getRosters = async () => {
    let { data: rosters } = await getAllRosters();
    console.log("got data");
    console.log(rosters);
    this.setState({ rosters });
  };

  delete = async sundayId => {
    let result = await deleteRoster(sundayId);
    if (result) {
      let rosters = [...this.state.rosters];
      rosters.map((roster, index) => {
        return roster._id === sundayId && rosters.splice(index, 1);
      });
      return this.setState({ rosters, show: false });
    }
  };

  render() {
    // let show, setShow;

    const handleClose = remove => {
      if (remove) {
        this.delete(this.state.model.sunday._id);
        return this.setState({ show: false });
      }
      return this.setState({ show: false });
    };

    const handleShow = sunday => {
      let model = {};
      model.message =
        "Delete Roster for " + formatDate(new Date(sunday.date)) + " ?";
      model.sunday = sunday;
      this.setState({ model, show: true });
    };

    return (
      <div className="">
        <Header header="EditRoster" />
        <ul className="list-group m-4">
          {this.state.rosters.map(sunday => (
            <li key={sunday._id} className="list-group-item">
              <div key={sunday._id + "1"} className="container">
                <div
                  key={sunday._id + "2"}
                  className="row justify-content-between"
                >
                  <div key={sunday._id + "3"} className="col">
                    {formatDate(new Date(sunday.date))}
                  </div>
                  <div key={sunday._id + "4"} className="col text-right">
                    <Link
                      key={sunday._id + "5"}
                      className="btn btn-primary m-1 btn-block "
                      to={"/admin/roster/updateRoster/" + sunday._id}
                    >
                      Update
                    </Link>
                    <button
                      className=" btn btn-danger m-1 btn-block "
                      onClick={() => handleShow(sunday)}
                    >
                      Delete
                    </button>

                    {/* <Modal
                      btnClass="btn-danger justify-content-center"
                      item="item"
                      label="Delete"
                      message={
                        "Delete Roster for " +
                        formatDate(new Date(sunday.date)) +
                        " ?"
                      }
                      onClick={() => this.delete(sunday._id)}
                    /> */}
                  </div>
                </div>
              </div>
            </li>
          ))}
          <Modal show={this.state.show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Attention!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.model.message}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Close
              </Button>
              <Button variant="danger" onClick={() => handleClose(true)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </ul>
      </div>
    );
  }
}

export default UpdateRoster;
