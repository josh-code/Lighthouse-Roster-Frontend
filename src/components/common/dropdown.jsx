import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

const getSuggestionValue = suggestion =>
  suggestion._id ? `${suggestion.firstName}` : suggestion;

const renderSuggestion = suggestion => (
  <div>
    {suggestion._id
      ? `${suggestion.firstName} ${suggestion.lastName}`
      : suggestion}
  </div>
);

class Dropdown extends Component {
  state = {
    value: this.props.value ? this.props.value : "",
    temp: this.props.value ? this.props.value : "",
    placeHolder: this.props.placeHolder ? this.props.placeHolder : "",
    data: this.props.data,
    suggestions: this.props.data
  };

  getSuggestions = value => {
    if (!value.length) {
      console.log("if");
      return this.state.data;
    }
    console.log("not if");
    console.log(value);
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? this.state.data
      : this.state.data.filter(
          person =>
            (person.firstName
              ? person.firstName.toLowerCase().slice(0, inputLength)
              : person.toLowerCase().slice(0, inputLength)) === inputValue
        );
  };

  onChange = (event, { newValue }) => {
    if (!newValue) {
      return this.setState({
        value: newValue,
        temp: newValue
      });
    }
    this.setState({
      value: newValue,
      temp: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (value === this.state.temp) {
      this.setState({
        suggestions: this.props.data
      });
    } else {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    }
  };
  suggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.props.onChange(suggestion);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, placeHolder } = this.state;
    const inputProps = {
      placeholder: placeHolder,
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.suggestionSelected}
        shouldRenderSuggestions={() => true}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Dropdown;
