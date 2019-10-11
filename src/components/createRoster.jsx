import React, { Component } from "react";
import Header from "./common/header";
import DayPickerInput from "react-day-picker/DayPickerInput";
import Dropdown from "./common/dropdown";
import Modal from "./common/modal";
import "react-day-picker/lib/style.css";
import { createRoster } from "../services/rosterService";
import { formatDate } from "./../utils/dateFormatter";
import { filterByRole, getAllUsers } from "../services/userService";

class CreateRoster extends Component {
  state = {
    users: [],
    date: {
      selectedDay: "hi",
      isEmpty: true,
      isValidDay: undefined,
      isDisabled: true
    },
    roles: [
      { role: "worshipLeader", label: "Worship Leader" },
      { role: "acoustic", label: "Acoustic" },
      { role: "keys", label: "Keys" },
      { role: "bass", label: "Bass" },
      { role: "drums", label: "Drums" },
      { role: "backingVocals", label: "Backing Vocals" },
      { role: "backingVocals", label: "Backing Vocals2" },
      { role: "hosting", label: "Hosting" },
      { role: "hospitality", label: "Hospitality" },
      { role: "breadAndWine", label: "Bread & Wine" },
      { role: "projection", label: "Projection" },
      { role: "sound", label: "Sound" }
    ],
    roster: {
      data: [
        { role: "worshipLeader", user: {}, status: "pending" },
        { role: "acoustic", user: {}, status: "pending" },
        { role: "keys", user: {}, status: "pending" },
        { role: "bass", user: {}, status: "pending" },
        { role: "drums", user: {}, status: "pending" },
        { role: "backingVocals", user: {}, status: "pending" },
        { role: "backingVocals", user: {}, status: "pending" },
        { role: "hosting", user: {}, status: "pending" },
        { role: "hospitality", user: {}, status: "pending" },
        { role: "breadAndWine", user: {}, status: "pending" },
        { role: "projection", user: {}, status: "pending" },
        { role: "sound", user: {}, status: "pending" }
      ]
    },
    SubmitButtonStatus: { status: "disabled", disable: true }
  };

  async componentDidMount() {
    await this.getUsers();
  }

  getUsers = async () => {
    let { data: users } = await getAllUsers();
    this.setState({ users });
  };

  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    let roster = { ...this.state.roster };
    roster.date = selectedDay;
    this.setState({
      date: {
        selectedDay,
        isEmpty: !input.value.trim(),
        isValidDay: typeof selectedDay !== "undefined",
        isDisabled: modifiers.disabled === true
      },
      roster,
      SubmitButtonStatus: !input.value.trim()
        ? { status: "disabled", disable: true }
        : { status: "", disable: false }
    });
  };

  addToRoster = (person, index) => {
    let roster = { ...this.state.roster };
    roster.data[index].user = person;
    console.log(roster);
    this.setState({ roster });
  };

  submit = async () => {
    try {
      let result = await createRoster(
        this.state.date.selectedDay,
        this.state.roster.data
      );
      result && this.props.history.push("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <Header header="CreateRoster" />
        <div className="card border-light">
          <div className="m-3">
            <DayPickerInput
              onDayChange={this.handleDayChange}
              selectedDay={this.state.date.selectedDay}
              dayPickerProps={{
                modifiers: {
                  disabled: [
                    {
                      daysOfWeek: [1, 2, 3, 4, 5, 6]
                    },
                    {
                      before: new Date()
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
        <div className="constainer m-2 mt-4">
          {this.state.roles.map((roles, index) => (
            <div key={roles.label} className="row align-items-center mt-3">
              <div key={roles.label + "1"} className="col-7">
                <Dropdown
                  onChange={person => this.addToRoster(person, index)}
                  data={filterByRole(this.state.users, roles.role)}
                />
              </div>
              <div key={roles.label + "2"} className="col">
                {roles.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Modal
            btnClass={
              "btn-primary justify-content-center  btn-lg btn-block " +
              this.state.SubmitButtonStatus.status
            }
            disabled={this.state.SubmitButtonStatus}
            item="item"
            label="Create_Roster"
            message={
              "Create Roster for " + formatDate(this.state.roster.date) + " ?"
            }
            onClick={() => this.submit()}
          />
        </div>
      </div>
    );
  }
}

export default CreateRoster;
